import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts, error }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={"1"} className={"alert alert-danger"}>
        <i className="fas fa-info-circle" /> {alert} {error}
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, timeout = 5000) => {
      dispatch({ type: "SET_ALERT", payload: [msg] });

      setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), timeout);
    },
  };
};

const AlertReducer = connect(mapStateToProps, mapDispatchToProps)(Alert);

export default AlertReducer;
