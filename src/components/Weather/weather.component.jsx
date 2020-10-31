import React from "react";
import "./weather.styles.scss";
import { connect } from "react-redux";
import { FormInput, CustomButton } from "../";
import { changeWeather, handleWeatherChange } from "../../redux/";

const Weather = ({
  weatherReport,
  weatherStatus,
  givenCityName,
  changeWeather,
  basicWeatherData,
  handleWeatherChange,
}) => {
  const wR = Object.keys(weatherReport);
  const {
    temp,
    temp_min,
    temp_max,
    humidity,
    pressure,
    feels_like,
  } = basicWeatherData;
  const { name } = weatherReport;
  return (
    <>
      {wR.length > 0 ? (
        <>
          <h3>
            Weather in {name} : {(temp - 273).toFixed(2)} °C
          </h3>
          <div>Feels like {(feels_like - 273).toFixed(2)} °C</div>
          <div>Humidity {humidity}</div>
          <div>Pressure {pressure}</div>
          <div>Max temp {(temp_max - 273).toFixed(2)} °C</div>
          <div>Min temp {(temp_min - 273).toFixed(2)} °C</div>
          <div>Description: {weatherStatus.description}</div>

          <FormInput
            type="text"
            name="givenCityName"
            value={givenCityName}
            handleChange={handleWeatherChange}
            label={`Check other cities weather`}
            required
          />
          <CustomButton onClick={changeWeather}>Change</CustomButton>
        </>
      ) : (
        <div>Cannot fetch weather data</div>
      )}
    </>
  );
};

//Calling the state from the reducer
const mapStateToProps = ({
  weather: {
    defaultCity,
    givenCityName,
    weatherReport,
    weatherStatus,
    basicWeatherData,
  },
}) => ({
  defaultCity,
  givenCityName,
  weatherReport,
  weatherStatus,
  basicWeatherData,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  changeWeather: (weather) => dispatch(changeWeather(weather)),
  handleWeatherChange: (weather) => dispatch(handleWeatherChange(weather)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
