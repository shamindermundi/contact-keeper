import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ContactForm = ({
  addContact,
  currentContact,
  clearCurrent,
  updateContact,
}) => {
  useEffect(() => {
    if (currentContact !== null) {
      setContact(currentContact);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [currentContact]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("currentContact is \n", currentContact);
    if (currentContact === null) {
      let contactDetails = contact;
      contactDetails = { ...contact, id: uuidv4() };
      addContact(contactDetails);
    } else {
      updateContact(contact);
      clearCurrent();
    }

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {currentContact ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        name="email"
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value={type}
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value={type}
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={currentContact ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {currentContact && (
        <div onClick={() => clearCurrent()}>
          <button className="btn btn-light btn-block">Clear</button>
        </div>
      )}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    currentContact: state.currentContact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => {
      dispatch({ type: "ADD_CONTACT", payload: contact });
    },
    updateContact: (contact) => {
      dispatch({ type: "UPDATE_CONTACT", payload: contact });
    },
    clearCurrent: () => {
      dispatch({ type: "CLEAR_CURRENT_CONTACT" });
    },
  };
};

const ContactFormReducer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);

export default ContactFormReducer;
