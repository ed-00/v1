import React from "react";
import calsses from "./Footer.module.css";
function Footer() {
  return (
    <div className={calsses.footer}>
      <div className={calsses.left}>
        <h2>Biosfärområde Älvlandskafet</h2>
        <h3>
          Välkommen till Nedre Dalälven som ligger 1,5 timme från Stockholm!
        </h3>
        <p>0291-211 80</p>
        <p>info@nedredalalven.se</p>
        <p>Nedre Dalälven, Kölnavägen 25, SE-811 97 Gysinge</p>
        <p>Mån-fre: 08:00 - 17:00</p>
      </div>
      <div className={calsses.right}>
        <h2>NYHETSBREV</h2>
        <h3>Registrera dig för Nedre Dalälvens nyhetsbrev!</h3>
        <form>
          <input type="email" placeholder="Fyll i din E-post"></input>
          <button>REGISTRERA</button>
        </form>
      </div>
    </div>
  );
}

export default Footer;
