import classes from "./MenuCard.module.css";
import checked from "../../../../../icons/checked.svg";
import unChecked from "../../../../../icons/unchecked.svg";

const MenuCard = (props) => {
  const onSelectHandler = () => {
    props.onClick()
  };
  return (
    <li>
      <button onClick={onSelectHandler} className={classes.button}>
        <img className={classes.picture} src={props.img} alt={props.name} />{" "}
        <img
          alt="icon"
          className={classes.icon}
          src={props.isSelected ? checked : unChecked}
        />{" "}
        <h1>{props.name}</h1>
      </button>
    </li>
  );
};

export default MenuCard;
