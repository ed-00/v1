import { useSelector, useDispatch } from "react-redux";
import { CategoryActions } from "../../../../store";
import canoe from "../../../../images/canoe-min.jpg";
import biking from "../../../../images/Biking-min.jpg";
import hiking from "../../../../images/hike-min.jpg";
import classes from "./MenuItems.module.css";
import MenuCard from "./MenuCard/MenuCard.js";
import SideMenu from "../SideMenu/SideMenu";

const MenuItems = () => {
  const dispatch = useDispatch();
  const canoeingIsSelected = useSelector(
    (state) => state.CategorySlice.canoeingIsSelected
  );
  const bikingIsSelected = useSelector(
    (state) => state.CategorySlice.bikingIsSelected
  );
  const hikingIsSelected = useSelector(
    (state) => state.CategorySlice.hikingIsSelected
  );

  const toggleCanoeing = () => {
    dispatch(CategoryActions.toggleCanoeing());
  };
  const toggleBiking = () => {
    dispatch(CategoryActions.toggleBiking());
  };
  const toggleHiking = () => {
    dispatch(CategoryActions.toggleHiking());
  };

  return (
    <div className={classes[`menu-items`]}>
      <SideMenu />
      <div className={classes.categorys}>
        <h1 className={classes.label}>Aktiviter</h1>
        <ul>
          <MenuCard
            id={0}
            key={0}
            img={canoe}
            name="Kanot"
            onClick={toggleCanoeing}
            isSelected={canoeingIsSelected}
          />
          <MenuCard
            id={1}
            key={1}
            img={biking}
            name="Biking"
            onClick={toggleBiking}
            isSelected={bikingIsSelected}
          />
          <MenuCard
            key={2}
            img={hiking}
            name="Hiking"
            onClick={toggleHiking}
            isSelected={hikingIsSelected}
          />
        </ul>
      </div>
    </div>
  );
};

export default MenuItems;
