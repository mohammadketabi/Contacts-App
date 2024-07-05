import React from "react";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContacts = () => {
  const { contactQuery, contactSearch } = useContext(ContactContext);
  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={contactSearch}
          value={contactQuery.text}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchContacts;
