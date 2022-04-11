import React from "react";
import classes from "./ThirdSection.module.css";
import Card from "./Card/Card";
import ulImg from "../../../images/UL.png";
import sjImg from "../../../images/sj-logo-png-.png";
import slImg from "../../../images/sl.png";
import taxiImg from "../../../images/car.png";

const ThirdSection = () => {
  return (
    <section>
      <h1>Du kan besöka oss genom..</h1>
      <Card img={ulImg} name="UL" dis="blabla blabla"/>
      <Card img={sjImg} name="SJ" dis="blabla blabla"/>
      <Card img={slImg} name="SL" dis="blabla blabla"/>
      <Card img={taxiImg} name="TAXI" dis="blabla blabla"/>
    </section>
  );
};

export default ThirdSection;
