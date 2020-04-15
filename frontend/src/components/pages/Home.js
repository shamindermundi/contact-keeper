import React from "react";
import { connect } from "react-redux";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

const Home = (props) => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
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
