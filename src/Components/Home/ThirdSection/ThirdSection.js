import React from "react";
import classes from "./ThirdSection.module.css";
import Card3 from "./Card3/Card3";
import ulImg from "../../../images/UL.png";
import sjImg from "../../../images/sj-logo-png-.png";
import slImg from "../../../images/sl.png";
import taxiImg from "../../../images/car.png";
import map from "../../../icons/map.svg";

const ThirdSection = () => {
  return (
    <section className={classes.section} id="ThirdSection">
      <div className={classes.imageSide}>
        <h1 className={classes.title2}>Hitta oss!</h1>
        <img src={map} alt={map} className={map}></img>
      </div>
      <div className={classes.cards}>
        <h1 className={classes.title}>Du kan besöka oss genom..</h1>
        <div className={classes.container}>
          <Card3 img={ulImg} name="UL" dis="Besök oss med UL" href="https://www.ul.se/#/480119/0/G%C3%A4vle%20Central%20(G%C3%A4vle)/72797/1/K%C3%B6l%C3%A4ngsv%C3%A4gen%2025%20Knivsta/"/>
          <Card3 img={sjImg} name="SJ" dis="Besök oss med SJ" href="https://www.sj.se/#/tidtabell/G%25C3%25A4vle%2520C/Knivsta%2520station/enkel/avgang/20220422-1327/avgang//VU--///0//"/>
          <Card3 img={slImg} name="SL" dis="Besök oss med SL" href="https://sl.se/?mode=travelPlanner&origName=Stockholm+City+%28Stockholm%29&origSiteId=1080&origPlaceId=QT0xQE89U3RvY2tob2xtIENpdHkgKFN0b2NraG9sbSlAWD0xODA1OTI5M0BZPTU5MzMxMDA4QFU9NzRATD0zMDAxMDEwODBAQj0xQHA9MTY1MDUyMTMwNEA%3D&destName=Kvista+%28Upplands-Bro%29&destPlaceId=QT0xQE89S3Zpc3RhIChVcHBsYW5kcy1Ccm8pQFg9MTc2MTU0NjhAWT01OTUxMzE5MkBVPTc0QEw9MzAwMTA1NjA3QEI9MUBwPTE2NTA2MTA2MjFA&transportTypes=111"/>
          <Card3 img={taxiImg} name="TAXI" dis="Besök oss med Taxi" href="https://gavletaxi.se/"/>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
