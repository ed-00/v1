import React from "react";
import classes from "./SecondSection.module.css";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Card from "./card/Card.js";


const Cards = [
  {
    id: 1,
    name: "Övernatta i en stuga",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    link: "https://res.cloudinary.com/djt2jlqzc/image/upload/v1649931204/section2/1_wf1yuj.jpg",
  },
  {
    id: 2,
    name: "För hela familjen",
    text:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    link: "https://res.cloudinary.com/djt2jlqzc/image/upload/v1649931204/section2/2_ynoo5h.jpg",
  },
  {
    id: 3,
    name: "Vandringsspår",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    link: "https://res.cloudinary.com/djt2jlqzc/image/upload/v1649931204/section2/3_mcdbqb.jpg",
  },
  {
    id: 4,
    name: "Vinteraktiviteter",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    link: "https://res.cloudinary.com/djt2jlqzc/image/upload/v1649931204/section2/4_nb9brk.jpg",
  },

];

function SecondSection() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <section className={classes.section} id="SecondSection">
      <h1 className={classes[`section-title`]}>BLI INSPIRERAD</h1>

      <motion.div
        ref={carousel}
        className={classes.carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className={classes[`inner-carousel`]}
        >
          {Cards.map((section) => {
            return (
              <Card
                key={section.id}
                name={section.name}
                desc={section.text}
                src={section.link}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SecondSection;
