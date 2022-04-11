import Classes from "./Card3.module.css";

const Card3 = (props) => {
  return (
    <div className={Classes.card}>
        <img src={props.img} alt={props.name} className={Classes.image}/>
      <div className={Classes.text}>
        <h1>{props.name}</h1>
        <p>{props.dis}</p>
        <a href={props.href}> klicka här för att hitta oss</a>
      </div>
    </div>
  );
};

export default Card3;
