import React from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const AddContact = ({
  loading,
  setContactInfo,
  contact,
  groups,
  createContactForm,
}) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={createContactForm}
          style={{ maxWidth: "500px", margin: "auto", paddingTop: "50px" }}
        >
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              onChange={setContactInfo}
              value={contact.fullName}
              name="fullName"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              onChange={setContactInfo}
              value={contact.email}
              name="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              onChange={setContactInfo}
              value={contact.mobile}
              name="mobile"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              onChange={setContactInfo}
              value={contact.job}
              name="job"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              onChange={setContactInfo}
              value={contact.img}
              name="img"
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Group</label>
            <select
              onChange={setContactInfo}
              value={contact.group}
              name="group"
              className="form-select"
            >
              <option>Select</option>
              {groups.length > 0 &&
                groups.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            style={{ marginRight: "10px" }}
            className="btn btn-primary"
          >
            Submit
          </button>
          <Link to={"/contacts"} className="btn btn-warning">
            Cancel
          </Link>
        </form>
      )}
    </>
  );
};

export default AddContact;
