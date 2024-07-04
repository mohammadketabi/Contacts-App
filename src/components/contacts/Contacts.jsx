import React from "react";
import { Contact, Loader } from "../index";
import { Link } from "react-router-dom";

const Contacts = ({ contacts, loading, confirmDelete }) => {
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
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <Contact
                  confirmDelete={() => confirmDelete(c.id, c.fullName)}
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
