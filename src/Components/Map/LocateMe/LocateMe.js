import React from "react";
import classes from "./LocateMe.module.css";
import compass from "../../../icons/myLocation.svg";

const LocateMe = ({ panTo }) => {
  return (
    <button
      className={classes.compass}
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }}
    >
      <img src={compass} alt="compass" />
    </button>
  );
};

export default LocateMe;
