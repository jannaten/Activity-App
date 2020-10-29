import React from "react";
import "./suggestion.styles.scss";
import { connect } from "react-redux";
import { toggleVisible, toggleLight } from "../../redux/";
import DescriptionHolder from "../../utils/descriptionHolder";

class Suggestions extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.toggleLight();
      this.props.toggleVisible();
    }, 5000);
  }

  render() {
    const { visible, weatherStatus, light } = this.props;
    return (
      <>
        <h3>Suggestions</h3>
        {visible ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={`http://openweathermap.org/img/wn/${weatherStatus.icon}@2x.png`}
                alt=""
              />
              <h4>{weatherStatus.description}</h4>( <h4> {light} </h4> )
            </div>
            <DescriptionHolder desc={weatherStatus.description.toLowerCase()} />
          </>
        ) : (
          <p>No suggestions at this moment</p>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  light: state.weather.light,
  visible: state.weather.visible,
  weatherStatus: state.weather.weatherStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLight: (light) => dispatch(toggleLight(light)),
    toggleVisible: (visible) => dispatch(toggleVisible(visible)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
