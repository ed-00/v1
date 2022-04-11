import React from "react";
import classes from "./SecondSection.module.css";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Card from "./card/Card.js";
/*import images from "./Images";*/

const Cards = [{ id: 1, name: "balaal", text: "bababababababaaba", link: "" }];

function Slide() {
  return (
    <section className={classes.SecondSection}>
      <motion.div className="carousel">
        <motion.div className="inner-carousel">
          {Cards.map((section) => {
            return (
              <motion.div className="item">
                <Card
                  key={section.id}
                  name={section.name}
                  link={section.link}
                  desc={section.text}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Slide;
