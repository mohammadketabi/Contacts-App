import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import {
  getContact,
  getGroup,
  getAllGroups,
  updateContact,
} from "../../services/contactServices";

const EditContact = ({ forceRender, setForceRender }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: true,
    contact: {
      fullName: "",
      email: "",
      mobile: "",
      job: "",
      img: "",
      group: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });

        const { data: contactData } = await getContact(contactId);

        const { data: groupsData } = await getAllGroups();

        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);

  const setContactInfo = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: [e.target.value],
      },
    });
  };

  const createContactForm = async (e) => {
    e.preventDefault();

    try {
      setState({ ...state, loading: true });
      const { data } = await updateContact(contactId, state.contact);

      setState({ ...state, loading: false });
      if (data) {
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups } = state;

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

export default EditContact;
