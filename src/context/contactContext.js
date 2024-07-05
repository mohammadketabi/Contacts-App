import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContact: () => {},
  contacts: [],
  groups: [],
  filteredContacts: [],
  contactQuery: {},
  onContactChange: () => {},
  deleteContact: () => {},
  createContact: () => {},
  updateContact: () => {},
  contactSearch: () => {},
});
