import React from "react";
import "./dashBoard.styles.scss";
import { connect } from "react-redux";
import { Weather, Archrive, Suggestions } from "../../components/";
import { Notifications, ActiveActivities } from "../../components/";
import { sortActiveActivities, sortNonActiveActivities } from "../../redux/";
import { setDefined, setDecrementMinutes, mountWeather } from "../../redux/";

class DashBoard extends React.Component {
  componentDidMount() {
    this.getActiveActivities();
    this.getNonActiveActivities();
    setInterval(() => {
      this.props.setDecrementMinutes();
    }, 60000);
    this.props.mountWeather(this.props.defaultCity, this.props.API_KEY);
  }

  componentDidUpdate(pP, pS, SS) {
    if (typeof pP.activities !== typeof this.props.activities) {
      this.props.setDefined();
    }
    if (pP.defaultCity !== this.props.defaultCity) {
      this.props.mountWeather(this.props.defaultCity, this.props.API_KEY);
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
        <h1>Daily Activities</h1>
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

//Calling the state from the reducer
const mapStateToProps = ({
  activities: { activities },
  weather: { defaultCity, API_KEY },
}) => ({
  API_KEY,
  activities,
  defaultCity,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  setDefined: () => dispatch(setDefined()),
  setDecrementMinutes: () => dispatch(setDecrementMinutes()),
  sortActiveActivities: () => dispatch(sortActiveActivities()),
  sortNonActiveActivities: () => dispatch(sortNonActiveActivities()),
  mountWeather: (city, API_KEY) => dispatch(mountWeather(city, API_KEY)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
