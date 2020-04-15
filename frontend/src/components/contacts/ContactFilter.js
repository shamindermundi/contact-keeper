import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

const ContactFilter = ({ filtered, filterContact, clearFilter }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    filtered: state.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterContact: (text) => {
      dispatch({ type: "FILTER_CONTACT", payload: text });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };
};

const ContactFilterReducer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactFilter);

export default ContactFilterReducer;
