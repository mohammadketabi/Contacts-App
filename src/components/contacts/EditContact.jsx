import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactServices";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    setLoading,
    groups,
    contacts,
    setContacts,
    setFilteredContacts,
  } = useContext(ContactContext);

  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onContactChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data, status } = await updateContact(contactId, contact);

      if (status === 200) {
        setLoading(false);

        const allContact = [...contacts];
        const contactIndex = allContact.findIndex(
          (c) => c.id === parseInt(contactId)
        );

        allContact[contactIndex] = { ...data };

        setContacts(allContact);
        setFilteredContacts(allContact);

        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={submitForm}
          style={{ maxWidth: "500px", margin: "auto", paddingTop: "50px" }}
        >
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              onChange={onContactChange}
              value={contact.fullName}
              name="fullName"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              onChange={onContactChange}
              value={contact.email}
              name="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              onChange={onContactChange}
              value={contact.mobile}
              name="mobile"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              onChange={onContactChange}
              value={contact.job}
              name="job"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              onChange={onContactChange}
              value={contact.img}
              name="img"
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Group</label>
            <select
              onChange={onContactChange}
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
