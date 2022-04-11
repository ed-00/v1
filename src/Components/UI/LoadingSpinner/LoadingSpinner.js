import React from "react";
import { BallTriangle } from "react-loader-spinner";
import classes from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={classes[`spinner-div`]}>
      <BallTriangle color="#fcba03" height={80} width={80} />
      <h1>Loading</h1>
    </div>
  );
};

export default LoadingSpinner;
