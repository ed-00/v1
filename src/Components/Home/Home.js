import React from "react";
import classes from "./Home.module.css";
import Nav from "./Nav/Nav";
import FirstSection from "./FirstSection/FirstSection"
import SecondSection from "./SecondSection/SecondSection"
import ThirdSection from "./ThirdSection/ThirdSection"
function Home() {
  return (
    <div className={classes.home}>
      <Nav/>
      <FirstSection/>
      <SecondSection/>
      <ThirdSection/>
    </div>
  );
}

export default Home;
