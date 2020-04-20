import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Register = ({
  setAlert,
  registerFailed,
  registerUser,
  isAuthenticated,
  history,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields.");
    } else if (password !== password2) {
      setAlert("Passwords do not match.");
    } else {
      console.log("register called");
      const config = {
        headers: {
          "Contant-Type": "application/json",
        },
      };

      try {
        const res = await axios.post("/api/users", user, config);

        // res.data is token returned from backend
        await registerUser(res.data);
        history.push("/");
      } catch (err) {
        registerFailed(err.response.data.msg);
      }
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
    alerts: state.alerts,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, timeout = 5000) => {
      dispatch({ type: "SET_ALERT", payload: [msg] });

      setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), timeout);
    },
    registerUser: (token) => {
      dispatch({ type: "REGISTER_USER", payload: token });
    },
    registerFailed: (err) => {
      dispatch({ type: "REGISTER_FAILED", payload: err });
    },
  };
};

const RegisterReducer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterReducer;
