import React from "react";
import classes from "./SideMenu.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import homeIcon from "../../../../icons/home.svg";

const SideMenu = () => {
  return (
    <motion.ul
      animate={{ y: 20 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={classes[`menu-list`]}
    >
      <li>
        <Link to="/home">
          <img src={homeIcon} alt="home" />
          Hem
        </Link>
      </li>
    </motion.ul>
  );
};

export default SideMenu;
