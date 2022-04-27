import React, { useState, useRef, useEffect } from "react";
import classes from "./MarkerInfo.module.css";
import { motion } from "framer-motion";
import Button from "../../UI/Button/Button";
import exitIcon from "../../../icons/exit.svg";
import Directions from "./Directions/Directions";

const ImageSlider = (props) => (
  //TODO
  <motion.div
    ref={props.carousel}
    className={classes[`image-container`]}
    whileTap={{
      cursor: "grabbing",
    }}
  >
    <motion.div
      drag="x"
      dragConstraints={{
        left: -props.width,
        right: 0,
      }}
      className={classes[`inner-container`]}
      initial={{position: "relative", x: 0}}
    >
      {props.images &&
        props.images.map((image) => (
          <motion.div key={image.src} className={classes.img}>
            <img draggable="false" src={image.src} alt={props.name} />
          </motion.div>
        ))}
    </motion.div>
  </motion.div>
);

const NoImage = () => (
  <div className={classes[`no-img`]}>
    {" "}
    <img
      draggable="false"
      src="https://res.cloudinary.com/djt2jlqzc/image/upload/v1649936443/Error/no-image_vjqohw.webp"
      alt="no-img-found"
    />{" "}
  </div>
);

const MarkerInfo = ({
  name,
  text,
  images,
  onExit,
  getDirection,
  directionMode,
  lat,
  lng,
  setRes,
}) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (images && images.length > 0)
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);

    return () => {
      setWidth(0);
    };
  }, [images, lat, lng]);

  const exitHandler = () => {
    onExit();
  };

  return (
    <motion.div
      animate={{ y: -642 }}
      transition={{ duration: 1 }}
      className={classes.MarkerInfo}
    >
      <button className={classes.exitBtn} onClick={exitHandler}>
        <img src={exitIcon} alt="exit" />
      </button>
      {images && images.length > 0 ? (
        <ImageSlider
          width={width}
          carousel={carousel}
          name={name}
          images={images}
        ></ImageSlider>
      ) : (
        <NoImage />
      )}

      {!directionMode ? (
        <div className={classes.text}>
          <h1>{name}</h1>
          {text.trim().length !== 0 ? (
            <p>{text}</p>
          ) : (
            <p>
              Vi kan tyvärr inte hitta info om {name} <br /> Men vi kan ta dig
              dit!
            </p>
          )}
          <Button onClick={getDirection} className={classes.button}>
            Hitta Dit
          </Button>
        </div>
      ) : (
        <Directions name={name} lat={lat} lng={lng} setRes={setRes} />
      )}
    </motion.div>
  );
};

export default MarkerInfo;
