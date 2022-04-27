import React from "react";
import useFetch from "../../../../Hooks/useFech";
import classes from "./Categories.module.css";

const Categories = () => {
  const { hasError, isLoading, data } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
  );
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (!isLoading && hasError) return <p>Error...</p>;
  return <ul className={classes[`categories-list`]}></ul>;
};

export default Categories;
