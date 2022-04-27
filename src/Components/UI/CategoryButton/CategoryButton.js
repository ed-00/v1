import React from "react";
import classes from "./CategoryButton.module.css";

const CategoryButton = ({
  onChangeHandler,
  icon,
  name,
  className,
  value,
  belongsTo,
  isChecked,
}) => {
  const clickhandler = (event) => {
    onChangeHandler(event.target.value);
  };
  return (
    <div className={`${classes.category} ${className} `}>
      <input
        type="radio"
        checked={isChecked}
        onChange={clickhandler}
        name={belongsTo}
        value={value}
        id={name}
      />
      <label className={classes.label} htmlFor={name}>
        {" "}
        <img src={icon} alt={name} />
      </label>
    </div>
  );
};

export default CategoryButton;
