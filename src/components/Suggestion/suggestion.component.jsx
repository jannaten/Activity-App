import React from "react";
import "./suggestion.styles.scss";
import { connect } from "react-redux";

const Suggestions = ({ weatherStatus }) => {
  return (
    <>
      <h3>Suggestions</h3>
      <p>No suggetions yet</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  weatherStatus: state.weather.weatherStatus,
});
export default connect(mapStateToProps)(Suggestions);
