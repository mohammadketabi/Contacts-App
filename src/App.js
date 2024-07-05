import { useState, useEffect } from "react";
import "./App.css";
import { confirmAlert } from "react-confirm-alert";
import {
  Navbar,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactServices";
import { ContactContext } from "./context/contactContext";

function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [contactQuery, setContactQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contacts } = await getAllContacts();
        const { data: groups } = await getAllGroups();

        setContacts(contacts);
        setFilteredContacts(contacts);
        setGroups(groups);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (e) => {
    e.preventDefault();

    try {
      const { status } = await createContact(contact);

      if (status === 201) {
        setContact({});

        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete {contactFullname}?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const contactSearch = (e) => {
    setContactQuery({ ...contactQuery, text: e.target.value });

    const allContacts = contacts.filter((c) => {
      return c.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredContacts(allContacts);
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={
              <Contacts
                confirmDelete={confirmDelete}
                contacts={filteredContacts}
                loading={loading}
                groups={groups}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <AddContact
                createContactForm={createContactForm}
                loading={loading}
                contact={contact}
                setContactInfo={onContactChange}
                groups={groups}
              />
            }
          />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
