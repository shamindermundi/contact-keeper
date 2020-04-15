import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ContactItem = ({ contact, deleteContact }) => {
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          <b style={{ textTransform: "capitalize" }}>{type}</b>
        </span>
      </h3>
      <ul>
        {email && <li className="fas fa-envelope-open"> {email}</li>}
        <br />
        {phone && <li className="fas fa-phone"> {phone}</li>}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete{" "}
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (id) => {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    },
  };
};

const ContactItemReducer = connect(null, mapDispatchToProps)(ContactItem);

export default ContactItemReducer;
