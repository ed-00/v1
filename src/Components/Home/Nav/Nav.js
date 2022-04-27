import React from "react";
import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import {Link as ScrollLink} from 'react-scroll';
const Nav = () => {
  const moveHandler = () => {
    
  };
  return (
    <nav className={classes.menu}>
      <ScrollLink to="FirstSection" spy={true} smooth={true} className={classes.logo}>
        Nedre Dalälven
      </ScrollLink>
      <ul>
        <li>
          <ScrollLink to="FirstSection" spy={true} smooth={true} className={classes.active}>
            Hem
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="SecondSection" spy={true} smooth={true} className={classes.active}>
            Fakta
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="ThirdSection" spy={true} smooth={true} className={classes.active}>
            Om oss
          </ScrollLink>
        </li>
        <li>
          <Link className={classes.button} to="/explore">
            Utforska
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
