import React from "react";
import { Link } from "react-router-dom";

const Contact = ({ contact, confirmDelete }) => {
  return (
    <>
      <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">
              {contact.fullName}
            </strong>
            <h3 className="mb-0">{contact.email}</h3>
            <div className="mb-1 text-muted">{contact.mobile}</div>
            <div>
              <Link
                to={`/contacts/${contact.id}`}
                className="btn btn-primary m-1"
              >
                View
              </Link>
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn btn-warning m-1"
              >
                Edit
              </Link>
              <button onClick={confirmDelete} className="btn btn-danger m-1">
                Delete
              </button>
            </div>
          </div>
          <div style={{ width: "25%" }} className="col-auto d-none d-lg-block">
            <img
              src={contact.img}
              className="img-thumbnail"
              alt={contact.fullName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
