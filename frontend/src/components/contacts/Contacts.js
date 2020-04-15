import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";

const Contacts = ({ contacts, filtered }) => {
  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};

Contacts.propType = {
  contacts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    filtered: state.filtered,
  };
};

const ContactsReducer = connect(mapStateToProps)(Contacts);

export default ContactsReducer;
