import React from "react";
import classes from "./Card.module.css";
import { motion } from "framer-motion";

const Card = (props) => {
  return (
    <motion.div className={classes[`card-container`]}>
      <div className={classes.subcard}>
        <div className={classes[`img-div`]}>
          <img draggable="false" src={props.src} alt={props.name} />
        </div>
      </div>
      <div className={classes[`card-content`]}>
        <h1>{props.name}</h1>
        <p>{props.desc}</p>
      </div>
    </motion.div>
  );
};

export default Card;
