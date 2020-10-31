import React from "react";
import "./suggestion.styles.scss";
import { connect } from "react-redux";
import { toggleVisible, toggleLight } from "../../redux/";
import DescriptionHolder from "../../utils/descriptionHolder";

class Suggestions extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.toggleVisible();
    }, 5000);
  }

  componentDidUpdate(pP, pS, PP) {
    if (pP.weatherStatus.icon !== this.props.weatherStatus.icon) {
      this.props.toggleLight();
    }
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
              <h4>{weatherStatus.description}</h4>({" "}
              {weatherStatus ? <h4> {light} </h4> : null})
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

const mapStateToProps = ({ weather: { light, visible, weatherStatus } }) => ({
  light,
  visible,
  weatherStatus,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLight: () => dispatch(toggleLight()),
  toggleVisible: () => dispatch(toggleVisible()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
