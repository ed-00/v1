import React, { useState } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./AddCategoryForm.module.css";
const AddCategoryForm = ({ setAddCategory, setValue, lat, lng }) => {
  const [categoryName, setCategoryName] = useState("");
  const [err, setErr] = useState("");
  const addHandler = () => {
    if (categoryName.trim().length > 0) {
      setValue({ type: categoryName, lat, lng });
      return;
    }
    setErr("Namet är tom...");
  };

  const nameChangeHandler = (event) => {
    setErr("");
    setCategoryName(event.target.value);
  };

  const backHandler = () => {
    setAddCategory(false);
  };

  return (
    <div className={classes.form}>
      <h1 htmlFor="category-name" className={classes.label}>
        Lägg till en Kategori
      </h1>
      <input
        id="category-name"
        type="text"
        placeholder="Skriv in namnet på kategorin"
        value={categoryName}
        onChange={nameChangeHandler}
      />
      {err && <p className={classes.err}>{err}</p>}
      <div className={classes.buttons}>
        <Button className={classes.back} onClick={backHandler}>
          Backa
        </Button>
        <Button onClick={addHandler} disabled={categoryName.trim().length < 0}>
          Lägg till
        </Button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
