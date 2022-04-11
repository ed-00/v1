import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.section}>
      <div className={classes.card}>
        <h1>{props.name}</h1>
        <p>{props.desc}</p>
      </div>
      <div className={classes.subcard}>
        <img src={props.src} alt={props.name} />
      </div>
    </div>
  );
};

export default Card;
