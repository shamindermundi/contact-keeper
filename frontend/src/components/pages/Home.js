import React from "react";
import { connect } from "react-redux";
import Contacts from "../contacts/Contacts";

const Home = (props) => {
  return (
    <div className="grid-2">
      <div>
        <h1>home</h1>
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const HomeReducer = connect(mapStateToProps)(Home);

export default HomeReducer;
