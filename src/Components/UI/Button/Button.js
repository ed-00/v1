import classes from "./Button.module.css";
const Button = (prop) => {
  return (
    <button
      onClick={prop.onClick}
      className={`${classes.button} ${prop.className}`}
      type={prop.type}
      disabled={prop.disabled}
    >
      {prop.children}
    </button>
  );
};

export default Button;
