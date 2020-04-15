import React, { useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Alert = ({ alerts }) => {
  console.log("alerts are \n\n", alerts);
  alerts.length > 0 && console.log("length oflaerts \n\n", alerts.length);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={"alert alert-danger"}>
        <i className="fas fa-info-circle" /> {alert}
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type, timeout = 5000) => {
      const id = uuidv4();
      dispatch({ type: "SET_ALERT", payload: { msg, type, id } });

      setTimeout(
        () => dispatch({ type: "REMOVE_ALERT", payload: id }),
        timeout
      );
    },
  };
};

const AlertReducer = connect(mapStateToProps, mapDispatchToProps)(Alert);

export default AlertReducer;
