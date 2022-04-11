import React from "react";
import classes from "./ThirdSection.module.css";
import Card3 from "./Card3/Card3";
import ulImg from "../../../images/UL.png";
import sjImg from "../../../images/sj-logo-png-.png";
import slImg from "../../../images/sl.png";
import taxiImg from "../../../images/car.png";

const ThirdSection = () => {
  return (
    <section className={classes.section}>
      <div className={classes.cards}>
      <h1 className={classes.title}>Du kan besöka oss genom..</h1>
      <div className={classes.container}>
        <Card3 img={ulImg} name="UL" dis="blabla blabla" />
        <Card3 img={sjImg} name="SJ" dis="blabla blabla" />
        <Card3 img={slImg} name="SL" dis="blabla blabla" />
        <Card3 img={taxiImg} name="TAXI" dis="blabla blabla" />
      </div>
      </div>
    </section>
  );
};

export default ThirdSection;
