import React from "react";
import filterIcon from "../../../icons/filterIcon.svg";
import mapHomeIcon from "../../../icons/mapHome.svg";
import classes from "./FilterButton.module.css";
const FilterButton = ({ onClick, home, className }) => {
  return (
    <button
      onClick={onClick}
      className={home ? classes.home : `${classes.filter} ${className}  `}
    >
      <img
        className={classes.img}
        src={`${home ? mapHomeIcon : filterIcon}`}
        alt="filter"
      />
    </button>
  );
};

export default FilterButton;
