import React from "react";
import classes from "./SideMenu.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import homeIcon from "../../../../icons/home.svg";
import factIcon from "../../../../icons/fact.svg";
import aboutIcon from "../../../../icons/about.svg";

const SideMenu = () => {
  return (
    <motion.ul
      animate={{ y: 20 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className={classes[`menu-list`]}
    >
      <li>
        <Link to="/home">
          <img src={homeIcon} alt="home" />
          Hem
        </Link>
      </li>
      <li>
        <Link to="/home">
          <img src={factIcon} alt="home" />
          Fakta
        </Link>
      </li>
      <li>
        <Link to="/home">
          <img src={aboutIcon} alt="home" />
          Besök oss
        </Link>
      </li>
    </motion.ul>
  );
};

export default SideMenu;
