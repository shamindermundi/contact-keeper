import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import getUserWithData from "./utils/setAuthToken";

const App = ({ loadUser, authError }) => {
  useEffect(() => {
    getUserWithData({ loadUser, authError });
    //eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (user) => dispatch({ type: "LOAD_USER", payload: user }),
    authError: () => dispatch({ type: "AUTH_ERROR" }),
  };
};

const AppWithData = connect(null, mapDispatchToProps)(App);

export default AppWithData;
