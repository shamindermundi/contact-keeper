import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ContactForm = (props) => {
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
    let contactDetails = contact;
    contactDetails = { ...contact, id: uuidv4() };
    props.addContact(contactDetails);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
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
        value="personal"
        defaultChecked={type === "personal"}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        defaultChecked={type === "professional"}
      />
      Professional
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => {
      dispatch({ type: "ADD_CONTACT", payload: contact });
    },
  };
};

const ContactFormReducer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);

export default ContactFormReducer;
