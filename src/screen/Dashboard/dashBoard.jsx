import React from "react";
import axios from "axios";
import "./dashBoard.styles.scss";
import { connect } from "react-redux";
import { API_KEY } from "../../constant";
import { Weather, Archrive, Suggestions } from "../../components/";
import { Notifications, ActiveActivities } from "../../components/";
import { sortActiveActivities, sortNonActiveActivities } from "../../redux/";
import { setDefined, setDecrementMinutes, getWeatherData } from "../../redux/";

class DashBoard extends React.Component {
  componentDidMount() {
    this.getActiveActivities();
    this.getNonActiveActivities();
    setInterval(() => {
      this.props.setDecrementMinutes();
    }, 60000);
    this.getWeather();
  }

  getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.defaultCity}&appid=${API_KEY}`
      );
      const mainTemp = response.data.main;
      const weatherStatus = response.data.weather[0];
      this.props.getWeatherData({
        weatherReport: response.data,
        basicWeatherData: mainTemp,
        weatherStatus,
      });
    } catch (e) {
      alert("City doesnot found, try another city");
    }
  };

  componentDidUpdate(pP, pS, SS) {
    if (typeof pP.activities !== typeof this.props.activities) {
      this.props.setDefined();
    }
    if (pP.defaultCity !== this.props.defaultCity) {
      this.getWeather();
    }
  }

  getActiveActivities = () => {
    this.props.sortActiveActivities();
  };

  getNonActiveActivities = () => {
    this.props.sortNonActiveActivities();
  };

  render() {
    return (
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Todo Activities
        </h1>
        <div className="container">
          <div className="child-container-1">
            <ActiveActivities />
          </div>
          <div className="child-container-2">
            <div className="cc-1">
              <Notifications />
            </div>
            <div className="cc-2">
              <Suggestions />
            </div>
            <div className="cc-3">
              <Archrive />
            </div>
          </div>
          <div className="child-container-3">
            <Weather />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities.activities,
  defaultCity: state.weather.defaultCity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDecrementMinutes: (activities) =>
      dispatch(setDecrementMinutes(activities)),
    sortActiveActivities: (activities) =>
      dispatch(sortActiveActivities(activities)),
    sortNonActiveActivities: (activities) =>
      dispatch(sortNonActiveActivities(activities)),
    setDefined: (activities) => dispatch(setDefined(activities)),
    getWeatherData: (activities) => dispatch(getWeatherData(activities)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
