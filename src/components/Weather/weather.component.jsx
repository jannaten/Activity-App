import React from "react";
import "./weather.styles.scss";
import { connect } from "react-redux";
import { FormInput, CustomButton } from "../";
import { changeWeather, handleWeatherChange } from "../../redux/";

const Weather = ({
  weatherReport,
  basicWeatherData,
  weatherStatus,
  handleWeatherChange,
  givenCityName,
  changeWeather,
}) => {
  const wR = Object.keys(weatherReport);
  const {
    temp,
    humidity,
    temp_min,
    pressure,
    temp_max,
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

const mapStateToProps = (state) => ({
  defaultCity: state.weather.defaultCity,
  givenCityName: state.weather.givenCityName,
  weatherReport: state.weather.weatherReport,
  weatherStatus: state.weather.weatherStatus,
  basicWeatherData: state.weather.basicWeatherData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeWeather: (weather) => dispatch(changeWeather(weather)),
    handleWeatherChange: (weather) => dispatch(handleWeatherChange(weather)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
