import React, { useState, useEffect } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { name, status };
    setTasks([...tasks, newTask]);
    setName("");
    setStatus("");
  };

  const handleClick = (val) => {
    setShow(val);
  };

  let displayedTasks = [];

  if (show === "active") {
    displayedTasks = tasks.filter((task) => task.status === "Active");
  } else if (show === "completed") {
    displayedTasks = tasks.filter((task) => task.status === "Completed");
  } else if (show === "archive") {
    displayedTasks = tasks.filter((task) => task.status === "Archive");
  } else if (show === "pending") {
    displayedTasks = tasks.filter((task) => task.status === "Pending");
  } else {
    displayedTasks = tasks;
  }

  const sortedTasks = displayedTasks.sort((a, b) => {
    if (a.status === "Active" && b.status === "Completed") {
      return -1;
    } else if (a.status === "Completed" && b.status === "Active") {
      return 1;
    } else if (a.status === "Archive" && b.status === "Pending") {
      return -1;
    } else if (a.status === "Pending" && b.status === "Archive") {
      return 1;
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "completed"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "archive" && "active"}`}
                type="button"
                onClick={() => handleClick("archive")}
              >
                Archive
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "pending" && "active"}`}
                type="button"
                onClick={() => handleClick("pending")}
              >
                Pending
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
