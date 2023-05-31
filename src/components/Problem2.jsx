import React, { useState } from "react";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [onlyEvenContacts, setOnlyEvenContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      const filteredContacts = onlyEvenContacts
        ? data.results.filter((contact) => contact.id % 2 === 0)
        : data.results;
      setContacts(filteredContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setSearchQuery("");
    setPage(1);
    fetchContacts();
  };

  const openModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    setSearchQuery("");
    setPage(1);
    fetchContacts();
  };

  const openModalC = (contact) => {
    setSelectedContact(contact);
    console.log(contact)
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleCheckboxChange = (event) => {
    setOnlyEvenContacts(event.target.checked);
    setPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const loadNextPage = () => {
    setPage(page + 1);
    fetchContacts();
  };
  return (
    <div className="container">
      <div className="row justify-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="flex justify-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {showModalA && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal A</h5>
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Contacts..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />

              <ul className="list-group">
                {contacts?.map((contact) => (
                  <li
                    className="list-group-item"
                    key={contact.id}
                    onClick={openModalC}
                  >
                    {contact.phone}
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary mt-3" onClick={loadNextPage}>
                Load More
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalB && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal B</h5>
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Contacts..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />

              <ul className="list-group">
                {contacts?.map((contact) => (
                  <li
                    className="list-group-item"
                    key={contact.id}
                    onClick={openModalC}
                  >
                    {contact.phone}
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary mt-3" onClick={loadNextPage}>
                Load More
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalC && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Details</h5>
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {/* <h6>Name: {selectedContact.name}</h6>
              <p>Email: {selectedContact.email}</p>
              <p>Phone: {selectedContact.phone}</p>
              <p>Address: {selectedContact.address}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
