import React, { useContext } from "react";
import { Contact, Loader } from "../index";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);

  return (
    <>
      <div className="container text-center p-3">
        <div className="row">
          <div className="col">
            <Link to={"/contacts/add"} className="btn btn-primary">
              Add New Contact
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="container p-3">
          <div className="row mb-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  deleteContact={() => deleteContact(c.id, c.fullName)}
                  key={c.id}
                  contact={c}
                />
              ))
            ) : (
              <p style={{ textAlign: "center", fontSize: 30 }}>
                Contacts not found!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
