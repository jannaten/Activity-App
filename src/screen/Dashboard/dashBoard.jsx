import React from "react";
import axios from "axios";
import "./dashBoard.styles.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_KEY } from "../../constant";
import FormInput from "../../components/Form-Input/form-input.component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CustomButton from "../../components/Custome-Button/custom-button.component";
import {
  setDefined,
  sortActivities,
  setDecrementMinutes,
  sortActiveActivities,
  setArchriveActivities,
  sortNonActiveActivities,
} from "../../redux/activities/activities.action";
import {
  handleChange,
  changeWeather,
  getWeatherData,
} from "../../redux/weather/weather.action";

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
    const wR = Object.keys(this.props.weatherReport);
    const {
      temp,
      humidity,
      temp_min,
      pressure,
      temp_max,
      feels_like,
    } = this.props.basicWeatherData;
    const { name } = this.props.weatherReport;
    return (
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Todo Activities
        </h1>
        <div className="container">
          <DragDropContext
            onDragEnd={(value) => this.props.sortActivities(value)}
          >
            <div className="child-container-1">
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
            </div>
          </DragDropContext>
          <div className="child-container-2">
            <div className="cc-1">
              <h3>Notifications</h3>
              {this.props.notifiedItem.length === 0 ? (
                <p>No notifications at this moment</p>
              ) : (
                this.props.notifiedItem.length > -1 &&
                this.props.notifiedItem.map((notice) => {
                  if (notice !== undefined) {
                    return (
                      <p key={notice.id}>
                        Your task {notice.name} has started now{" "}
                      </p>
                    );
                  }

                  return notice;
                })
              )}
            </div>
            <div className="cc-2">
              <h3>Suggestions</h3>
              <p>No suggetions yet</p>
            </div>
            <div className="cc-3">
              <h3>Archive</h3>
              <div>
                {this.props.activitiesNonActive.map((ac) => (
                  <div key={ac.id}>
                    {ac.completed ? (
                      <div>
                        <p>{ac.name} - task accomplised </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {wR.length > 0 ? (
            <div className="child-container-3">
              <h3>
                Weather in {name} : {(temp - 273).toFixed(2)} °C
              </h3>
              <div>Feels like {(feels_like - 273).toFixed(2)} °C</div>
              <div>Humidity {humidity}</div>
              <div>Pressure {pressure}</div>
              <div>Max temp {(temp_max - 273).toFixed(2)} °C</div>
              <div>Min temp {(temp_min - 273).toFixed(2)} °C</div>
              <div>Description: {this.props.weatherStatus.description}</div>

              <FormInput
                type="text"
                name="givenCityName"
                value={this.props.givenCityName}
                label={`Check other cities weather`}
                handleChange={this.props.handleChange}
                required
              />
              <CustomButton onClick={this.props.changeWeather}>
                Change
              </CustomButton>
            </div>
          ) : (
            <div>Cannot fetch weather data</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities.activities,
  activitiesActive: state.activities.activitiesActive,
  activitiesNonActive: state.activities.activitiesNonActive,
  givenCityName: state.weather.givenCityName,
  defaultCity: state.weather.defaultCity,
  weatherReport: state.weather.weatherReport,
  weatherStatus: state.weather.weatherStatus,
  basicWeatherData: state.weather.basicWeatherData,
  notifiedItem: state.activities.notifiedItem,
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
    handleChange: (activities) => dispatch(handleChange(activities)),
    changeWeather: (activities) => dispatch(changeWeather(activities)),
    getWeatherData: (activities) => dispatch(getWeatherData(activities)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
