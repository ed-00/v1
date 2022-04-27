import Classes from "./Card3.module.css";
import Tilt from "react-tilt";
const Card3 = (props) => {
  return (
    <Tilt className={Classes.card} style={{ width: 300, height: 300 }}>
      <img src={props.img} alt={props.name} className={Classes.image} />
      <div className={Classes.text}>
        <h1>{props.name}</h1>
        <p>{props.dis}</p>
        <a href={props.href.toString()}> klicka här för att hitta oss</a>
      </div>
    </Tilt>
  );
};

export default Card3;
