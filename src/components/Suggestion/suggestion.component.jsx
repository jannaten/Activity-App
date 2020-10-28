import React from "react";
import "./suggestion.styles.scss";
import { connect } from "react-redux";
import { toggleVisible } from "../../redux/";

class Suggestions extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.toggleVisible();
    }, 5000);
  }
  render() {
    return (
      <>
        <h3>Suggestions</h3>
        {this.props.visible ? (
          <p>{this.props.weatherStatus.description}</p>
        ) : (
          <p>No suggestions at this moment</p>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.weather.visible,
  weatherStatus: state.weather.weatherStatus,
});

const mapDispatchToProps = (dispatch) => {
  return { toggleVisible: (visible) => dispatch(toggleVisible(visible)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
