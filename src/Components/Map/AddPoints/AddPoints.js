import React, { useState, useEffect } from "react";
import AddForm from "./AddForm/AddForm";
import classes from "./AddPoints.module.css";
import swim from "../../../icons/swim.svg";
import walking from "../../../icons/walk.svg";
import bike from "../../../icons/bike.svg";
import canoeCat from "../../../icons/canoeCat.svg";
import rest from "../../../icons/rest.svg";
import grill from "../../../icons/grill.svg";
import close from "../../../icons/exit.svg";
import { motion } from "framer-motion";
import usePost from "../../../Hooks/usePost";
import Button from "../../UI/Button/Button";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";

const AddPoints = ({ point, onCancel, setPoiData, categoriesList }) => {
  const [value, setValue] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const { loading, err, post } = usePost({
    url: "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/poi/Categories",
    method: "PUT",
  });

  const AddPointsHandler = (event) => {
    event.preventDefault();
    setValue({
      lat: point.lat,
      lng: point.lng,
      type: event.currentTarget.value,
    });
  };

  const submitHandler = (values) => {
    const req = {
      ...value,
      ...values,
    };
    let arr;
    var dataToSend;
    let CategoryIndex;
    let path = ".json";

    if (
      !addCategory ||
      categoriesList.some(
        (cat) => cat.toLowerCase() === value.type.toLowerCase()
      )
    ) {
      setPoiData((prevState) => {
        var oldPoint = prevState.Categories.findIndex((el, index) => {
          CategoryIndex = index;
          return el.type.toLowerCase() === value.type.toLowerCase();
        });

        var oldlist = prevState;
        oldlist.Categories[oldPoint].points.push({ ...req });
        arr = oldlist.Categories[oldPoint].points;

        return { ...oldlist };
      });
      path = `/${CategoryIndex}/points.json`;
      dataToSend = arr;
    } else {
      var categoryObject = {
        type: value.type,
        points: [{ ...req }],
        icon: "https://res.cloudinary.com/djt2jlqzc/image/upload/v1650972442/POI-Icons/UserAddedIcon_ej3mjx.svg",
      };

      setPoiData((prevState) => {
        var oldlist = prevState;
        oldlist.Categories.push(categoryObject);
        arr = oldlist.Categories;
        return { ...oldlist };
      });
      dataToSend = arr;
    }

    post({
      data: JSON.stringify(dataToSend),
      path: path,
    });

    onCancel();
  };

  const onAddCategoryHandler = () => {
    setAddCategory(true);
  };
  useEffect(() => {
    setValue(null);
    setAddCategory(false);
    return () => {};
  }, [point]);

  return (
    <motion.div
      animate={{ y: -200, x: -200 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className={classes.addpoint}
    >
      <button onClick={onCancel} className={classes.close}>
        <img src={close} alt="close" />
      </button>
      {!value && !addCategory ? (
        <>
          <h2>Lägg Till En Punkt</h2>

          <div className={classes.buttonDiv}>
            <button onClick={AddPointsHandler} value="Swim">
              <img src={swim} alt="Swim" />
              Simplats
            </button>

            <button onClick={AddPointsHandler} value="Walk">
              <img src={walking} alt="Walking" />
              Vandringsspår
            </button>

            <button onClick={AddPointsHandler} value="Bike">
              <img src={bike} alt="Bike" />
              Cykelled
            </button>

            <button onClick={AddPointsHandler} value="Canoe">
              <img src={canoeCat} alt="Canoe" />
              Kanotplats
            </button>

            <button onClick={AddPointsHandler} value="Rest">
              <img src={rest} alt="Rest" />
              Rastplats
            </button>

            <button onClick={AddPointsHandler} value="Grill">
              <img src={grill} alt="Grill" />
              Grillplats
            </button>
          </div>
          <Button
            className={classes[`add-Category-button`]}
            onClick={onAddCategoryHandler}
          >
            Lägg Till En Kategori
          </Button>
        </>
      ) : !value && addCategory ? (
        <AddCategoryForm
          setAddCategory={setAddCategory}
          setValue={setValue}
          lat={point.lat}
          lng={point.lng}
        />
      ) : (
        <AddForm submit={submitHandler} error={err} loading={loading} />
      )}
    </motion.div>
  );
};

export default AddPoints;
