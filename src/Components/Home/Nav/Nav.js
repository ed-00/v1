import React from "react";
import classes from "./Nav.module.css";
import{Link} from "react-router-dom"
const Nav = () => {
  return (
    <nav className={classes.menu}>
      <button href="#" className={classes.logo}>
        Nedre Dalälven
      </button>
      <ul>
        <li>
          <button className={classes.active}>Hem</button>
        </li>
        <li>
          <button className={classes.active}>Fakta</button>
        </li>
        <li>
          <button className={classes.active}>Om oss</button>
        </li>
        <li>
          <Link className={classes.button} to="/explore">Utforska</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
