import React from "react";
import axios from "axios";
import "./dashBoard.styles.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_KEY } from "../../constant";
import Weather from "../../components/Weather/weather.component";
import Archrive from "../../components/Archrive/archrive.component";
import FormInput from "../../components/Form-Input/form-input.component";
import Suggestions from "../../components/Suggestion/suggestion.component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Notifications from "../../components/Notifications/notifications.component";
import CustomButton from "../../components/Custome-Button/custom-button.component";
import {
  setDefined,
  sortActivities,
  setDecrementMinutes,
  sortActiveActivities,
  setArchriveActivities,
  sortNonActiveActivities,
} from "../../redux/activities/activities.action";
import { getWeatherData } from "../../redux/weather/weather.action";

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
            <DragDropContext
              onDragEnd={(value) => this.props.sortActivities(value)}
            >
              <h3>Activities on process</h3>
              {this.props.activitiesActive !== undefined ? (
                <Droppable droppableId="activities">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {this.props.activitiesActive.map((ac, index) => {
                        return (
                          <Draggable
                            key={ac.id}
                            index={index}
                            draggableId={ac.id}
                          >
                            {(provided) => (
                              <div
                                key={ac.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {!ac.completed ? (
                                  <div>
                                    <h4>{ac.name}</h4>
                                    {ac.timeSet >= 0 ? (
                                      <p>
                                        {ac.timeSet}{" "}
                                        {ac.timeSet === 1 ||
                                        ac.timeSet === 0 ? (
                                          <span>minute</span>
                                        ) : (
                                          <span>minutes</span>
                                        )}{" "}
                                        to go
                                      </p>
                                    ) : (
                                      <p>
                                        You are {Math.abs(ac.timeSet)}{" "}
                                        {Math.abs(ac.timeSet) === 1 ? (
                                          <span>minute</span>
                                        ) : (
                                          <span>minutes</span>
                                        )}{" "}
                                        late
                                      </p>
                                    )}
                                    <CustomButton
                                      onClick={() =>
                                        this.props.setArchriveActivities(ac.id)
                                      }
                                    >
                                      Move to Archive
                                    </CustomButton>
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : (
                <>
                  <h1>No more active projects</h1>
                </>
              )}
            </DragDropContext>
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
  activitiesActive: state.activities.activitiesActive,
  defaultCity: state.weather.defaultCity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sortActivities: (activities) => dispatch(sortActivities(activities)),
    setArchriveActivities: (activities) =>
      dispatch(setArchriveActivities(activities)),
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
