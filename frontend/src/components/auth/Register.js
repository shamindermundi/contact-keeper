import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Register = ({ setAlert }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all feilds.");
    } else if (password !== password2) {
      setAlert("Passwords do not match.");
    } else {
      console.log("Restered");
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type, timeout = 7000) => {
      dispatch({ type: "SET_ALERT", payload: [msg] });

      setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), timeout);
    },
  };
};

const RegisterReducer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterReducer;
