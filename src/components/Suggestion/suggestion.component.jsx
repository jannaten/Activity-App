import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleVisible, toggleLight } from "../../redux/";
import DescriptionHolder from "../../utils/descriptionHolder";
import { selectLight, selectVisible, selectWeatherStatus } from "../../redux/";

function Suggestions({ light, visible, toggleVisible, weatherStatus }) {
  useEffect(() => {
    setTimeout(() => {
      toggleVisible();
    }, 5000);
  });

  useEffect(() => {
    toggleLight();
  }, [weatherStatus.icon]);

  return (
    <>
      {weatherStatus.description !== undefined ? (
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
              <DescriptionHolder
                desc={weatherStatus.description.toLowerCase()}
              />
            </>
          ) : (
            <p>No suggestions at this moment</p>
          )}
        </>
      ) : null}
    </>
  );
}

//Calling the state from the reducer
const mapStateToProps = createStructuredSelector({
  light: selectLight,
  visible: selectVisible,
  weatherStatus: selectWeatherStatus,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  toggleLight: () => dispatch(toggleLight()),
  toggleVisible: () => dispatch(toggleVisible()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
