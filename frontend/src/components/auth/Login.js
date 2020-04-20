import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Login = ({
  setAlert,
  loginFailed,
  loginUser,
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
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all feilds.");
    } else {
      const config = {
        headers: {
          "Contant-Type": "application/json",
        },
      };

      try {
        const res = await axios.post("/api/auth", user, config);

        // res.data is token returned from backend
        loginUser(res.data);
        history.push("/");
      } catch (err) {
        loginFailed(err.response.data.msg);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
          />
        </div>

        <input
          type="submit"
          value="Login"
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
    loginUser: (token) => {
      dispatch({ type: "LOGIN_USER", payload: token });
    },
    loginFailed: (err) => {
      dispatch({ type: "LOGIN_FAILED", payload: err });
    },
  };
};

const LoginWithData = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginWithData;
