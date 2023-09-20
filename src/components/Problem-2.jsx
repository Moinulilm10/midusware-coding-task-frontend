import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showModalC, setShowModalC] = useState(false);
  const [activeContactId, setActiveContactId] = useState(null);

  const countryModalToggler = (idx) => {
    setActiveContactId(idx);
    setShowModalC((prev) => !prev);
  };

  const handleAllContactsClick = () => {
    setShowModalA(true);
    setShowModalB(false);
    updateURLParameter("modal", "A");
  };

  const handleUSContactsClick = () => {
    setShowModalA(false);
    setShowModalB(true);
    updateURLParameter("modal", "B");
  };

  const handleCloseModalClick = () => {
    setShowModalA(false);
    setShowModalB(false);
    updateURLParameter("modal", null);
  };

  const handleCheckboxChange = (event) => {
    setOnlyEven(event.target.checked);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://contact.mediusware.com/api/contacts/"
      );
      const data = await response.json();
      setContacts(data?.results);
      console.log(data);
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Function to handle URL parameter update
    const handleURLChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const modalParam = urlParams.get("modal");

      if (modalParam === "A") {
        setShowModalA(true);
        setShowModalB(false);
      } else if (modalParam === "B") {
        setShowModalA(false);
        setShowModalB(true);
      } else {
        setShowModalA(false);
        setShowModalB(false);
      }
    };

    window.addEventListener("popstate", handleURLChange);

    // Initialize modal state based on the initial URL parameter
    handleURLChange();

    return () => window.removeEventListener("popstate", handleURLChange);
  }, []);

  useEffect(() => {
    // Update the URL parameter when the active modal changes
    const modalParam = showModalA ? "A" : showModalB ? "B" : "";
    updateURLParameter("modal", modalParam);
  }, [showModalA, showModalB]);

  useEffect(() => {
    // Filter contacts based on search term and even IDs
    let filtered = contacts;

    if (onlyEven) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    if (searchTerm) {
      filtered = filtered.filter((contact) =>
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, onlyEven, searchTerm]);

  const updateURLParameter = (key, value) => {
    const urlParams = new URLSearchParams(window.location.search);

    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }

    const newURL = `${window.location.pathname}${
      urlParams.toString() ? `?${urlParams.toString()}` : ""
    }`;
    window.history.pushState({}, "", newURL);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            style={{ color: "#46139f" }}
            type="button"
            onClick={handleAllContactsClick}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            style={{ color: "#ff7f50" }}
            type="button"
            onClick={handleUSContactsClick}
          >
            US Contacts
          </button>
        </div>

        {/* modal A */}
        <Modal show={showModalA} onHide={handleCloseModalClick}>
          <Modal.Header closeButton>
            <Modal.Title>
              Modal A <h6>All contact</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>

            {filteredContacts.map((contact) => (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => countryModalToggler(contact.id)}
                key={contact.id}
              >
                {contact.id}.{" "}
                <span className="text-decoration-underline text-primary">
                  {contact.phone}
                </span>
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ color: "#46139f" }}
              onClick={handleAllContactsClick}
            >
              All Contacts
            </Button>
            <Button
              variant="primary"
              style={{ color: "#ff7f50" }}
              onClick={handleUSContactsClick}
            >
              US Contacts
            </Button>
            <Button
              variant="secondary"
              style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
              onClick={handleCloseModalClick}
            >
              Close
            </Button>
            <div className="form-check">
              <Form.Check
                id="checkboxA"
                label="Only even"
                checked={onlyEven}
                onChange={handleCheckboxChange}
              />
            </div>
          </Modal.Footer>
        </Modal>

        {/* modal B */}
        <Modal show={showModalB} onHide={handleCloseModalClick}>
          <Modal.Header closeButton>
            <Modal.Title>
              Modal B <h6>US contact</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            {filteredContacts
              .filter((contact) => contact.country.name === "United States")
              .map((contact) => (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => countryModalToggler(contact.id)}
                  key={contact.id}
                >
                  {contact.id}.{" "}
                  <span className="text-decoration-underline text-primary">
                    {contact.phone}
                  </span>
                </p>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ color: "#46139f" }}
              onClick={handleAllContactsClick}
            >
              All Contacts
            </Button>
            <Button
              variant="primary"
              style={{ color: "#ff7f50" }}
              onClick={handleUSContactsClick}
            >
              US Contacts
            </Button>
            <Button
              variant="secondary"
              style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
              onClick={handleCloseModalClick}
            >
              Close
            </Button>
            <div className="form-check">
              <Form.Check
                id="checkboxB"
                label="Only even"
                checked={onlyEven}
                onChange={handleCheckboxChange}
              />
            </div>
          </Modal.Footer>
        </Modal>

        {/* modal C */}
        {showModalC && (
          <Modal show={showModalC} onHide={handleCloseModalClick}>
            <Modal.Header closeButton>
              <Modal.Title>Modal C</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {contacts.find((x) => x.id === activeContactId)?.country?.name}
              </p>

              <div className="row">
                <div className="col-md-12 text-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => countryModalToggler(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Problem2;
