import Classes from "./Card.module.css"

const Card = (props) => {
    return <div className={Classes.card}>
        <img src={props.img} alt={props.name}/>
        <h1>{props.name}</h1>
        <p>{props.dis}</p>
        <a href={props.href}> klicka här för att ...</a>
    </div>
}

export default Card;