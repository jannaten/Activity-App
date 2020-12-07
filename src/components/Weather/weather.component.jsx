import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FormInput, CustomButton, Loader } from "../";
import { changeWeather, handleWeatherChange } from "../../redux/";
import { selectDefaultCity, selectGivenCityName } from "../../redux/";
import { selectIsPending, selectBasicWeatherData } from "../../redux/";
import { selectWeatherReport, selectWeatherStatus } from "../../redux/";

const Weather = ({
  isPending,
  weatherReport,
  weatherStatus,
  givenCityName,
  changeWeather,
  basicWeatherData,
  handleWeatherChange,
}) => {
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
      {!isPending ? (
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
        <Loader />
      )}
    </>
  );
};

//Calling the state from the reducer
const mapStateToProps = createStructuredSelector({
  isPending: selectIsPending,
  defaultCity: selectDefaultCity,
  givenCityName: selectGivenCityName,
  weatherReport: selectWeatherReport,
  weatherStatus: selectWeatherStatus,
  basicWeatherData: selectBasicWeatherData,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  changeWeather: (weather) => dispatch(changeWeather(weather)),
  handleWeatherChange: (weather) => dispatch(handleWeatherChange(weather)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
