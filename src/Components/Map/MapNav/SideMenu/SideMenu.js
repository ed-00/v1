import React from "react";
import classes from "./SideMenu.module.css";
import { Link } from "react-router-dom";
const SideMenu = () => {
  return (
    <ul className={classes[`menu-list`]}>
      <li>
        <h1>Meny</h1>
      </li>
      <li>
        <Link to="/home">Hem</Link>
      </li>
      <li>
        <Link to="/home">Besök oss</Link>
      </li>
      <li>
        <Link to="/home">Fakta</Link>
      </li>
    </ul>
  );
};

export default SideMenu;
