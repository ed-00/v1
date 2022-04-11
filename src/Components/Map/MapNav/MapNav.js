import React, { useState } from "react";
import classes from "./MapNav.module.css";
import MapSearch from "./MapSearch/MapSearch";
import Menu from "../../../icons/menu.svg";
import Close from "../../../icons/close.svg";
import MenuItems from "./MenuItems/MenuItems"

const MapNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenueHandler = () => {
    setIsOpen((state) => !state);
  };
  return (
    <div className={classes[`map-nav`]}>
      <div className={classes[`seach-menu`]}>
        <button className={classes[`burger-menu`]} onClick={toggleMenueHandler}>
          <img src={!isOpen ? Menu : Close} alt="menu-icon" />
        </button>
        <MapSearch panTo={() => null} />
      </div>
      {isOpen && <MenuItems />}
    </div>
  );
};

export default MapNav;
