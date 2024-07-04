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

function App() {
  const [forceRender, setForceRender] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    mobile: "",
    job: "",
    img: "",
    group: "",
  });
  const [query, setQuery] = useState({ text: "" });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contacts } = await getAllContacts();

        setContacts(contacts);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);

  const createContactForm = async (e) => {
    e.preventDefault();

    try {
      const { status } = await createContact(contact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setContactInfo = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const confirm = (contactId, contactFullname) => {
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
    setQuery({ ...query, text: e.target.value });
    console.log(contacts);
    const allContacts = contacts.filter((c) => {
      return c.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredContacts(allContacts);
  };

  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              confirmDelete={confirm}
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
              setContactInfo={setContactInfo}
              groups={groups}
            />
          }
        />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
      </Routes>
    </div>
  );
}

export default App;
