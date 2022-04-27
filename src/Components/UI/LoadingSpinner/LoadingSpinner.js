import React from "react";
import { BallTriangle } from "react-loader-spinner";
import classes from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={classes[`spinner-div`]}>
      <BallTriangle color="#38D5BC" height={80} width={80} />
      <h1>Loading</h1>
    </div>
  );
};

export default LoadingSpinner;
