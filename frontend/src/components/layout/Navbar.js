import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon, isAuthenticated, logout }) => {
  const userLogout = () => {
    localStorage.removeItem("token");
    logout();
  };
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}> {title}</i>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {isAuthenticated ? (
          <li onClick={() => userLogout()} style={{ cursor: "pointer" }}>
            Logout
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: "LOGOUT_USER" });

      setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
    },
  };
};

const NavbarWithData = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarWithData;
