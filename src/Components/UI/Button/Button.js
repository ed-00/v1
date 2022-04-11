import classes from "./Button.module.css"
const Button = (prop) => {
  return <button onClick={prop.onClick} className={`${classes.button} ${prop.className}`}>{prop.children}</button>;
};

export default Button;
