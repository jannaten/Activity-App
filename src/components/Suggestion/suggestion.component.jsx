import React from "react";
import "./suggestion.styles.scss";
import { connect } from "react-redux";
import { toggleVisible } from "../../redux/";
import DescriptionHolder from "../../utils/descriptionHolder";

class Suggestions extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.toggleVisible();
    }, 5000);
  }
  render() {
    const { visible, weatherStatus } = this.props;
    return (
      <>
        <h3>Suggestions</h3>
        {visible ? (
          <>
            <h4>weather Stutus</h4>
            <img
              src={`http://openweathermap.org/img/wn/${weatherStatus.icon}@2x.png`}
              alt=""
            />
            <DescriptionHolder desc={weatherStatus.description} />
          </>
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
