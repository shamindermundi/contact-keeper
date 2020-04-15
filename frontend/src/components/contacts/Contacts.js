import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";

const Contacts = ({ contacts }) => {
  return (
    <Fragment>
      {contacts.map((contact) => (
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
  };
};

const ContactsReducer = connect(mapStateToProps)(Contacts);

export default ContactsReducer;
