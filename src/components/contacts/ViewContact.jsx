import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact, getGroup } from "../../services/contactServices";
import { Loader } from "../../components";

const ViewContact = () => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({
          ...state,
          loading: true,
        });
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData,
        });
      } catch (error) {
        console.log(error.message);
        setState({
          ...state,
          loading: false,
        });
      }
    };
    fetchData();
  }, []);

  const { loading, contact, group } = state;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">
                    {contact.fullName}
                  </strong>
                  <h3 className="mb-0">{contact.fullName}</h3>
                  <h3 className="mb-0">{contact.email}</h3>
                  <h3 className="mb-0">{contact.mobile}</h3>
                  <h3 className="mb-0">{contact.job}</h3>
                  <h3 className="mb-0">{group.name}</h3>
                </div>
                <div
                  style={{ width: "25%" }}
                  className="col-auto d-none d-lg-block"
                >
                  <img
                    src={contact.img}
                    className="img-thumbnail"
                    alt={contact.fullName}
                  />
                </div>
              </div>
              <Link to={"/contacts"}>Back to home</Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
