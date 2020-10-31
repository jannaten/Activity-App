import React from "react";
import axios from "axios";
import "./dashBoard.styles.scss";
import { connect } from "react-redux";
import DashBoardStyle from "../styles";
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
      const { defaultCity } = this.props;
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}`
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
        <h1 style={DashBoardStyle.HeaderContainer}>Daily Activities</h1>
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

const mapStateToProps = ({
  weather: { defaultCity },
  activities: { activities },
}) => ({
  activities,
  defaultCity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDefined: () => dispatch(setDefined()),
    setDecrementMinutes: () => dispatch(setDecrementMinutes()),
    sortActiveActivities: () => dispatch(sortActiveActivities()),
    getWeatherData: (weather) => dispatch(getWeatherData(weather)),
    sortNonActiveActivities: () => dispatch(sortNonActiveActivities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
