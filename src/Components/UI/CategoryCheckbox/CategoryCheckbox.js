import React from "react";
import classes from "./CategoryCheckbox.module.css";

const CategoryCheckbox = (props) => {
  const changeHandler = () => {
    props.onChange();
  };

  return (
    <li className={classes.checkbox}>
      <input
        className={classes.input}
        type="checkbox"
        id={props.label}
        checked={props.checked === undefined ? true : props.checked}
        onChange={changeHandler}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </li>
  );
};

export default CategoryCheckbox;
