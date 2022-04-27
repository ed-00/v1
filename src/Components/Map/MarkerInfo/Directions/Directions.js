import React, { useState, useEffect, useCallback } from "react";
import Button from "../../../UI/Button/Button";
import MapSearch from "../../MapNav/MapSearch/MapSearch";
import classes from "./Directions.module.css";
import compass from "../../../../icons/location.svg";
import CategoryButton from "../../../UI/CategoryButton/CategoryButton";
import carIcon from "../../../../icons/car.svg";
import walkingIcon from "../../../../icons/walk.svg";
import bikeIcon from "../../../../icons/bike.svg";

const Directions = ({ name, lat: toLat, lng: toLng, setRes }) => {
  const [useCurrentP, setUseCurrenP] = useState(false);
  const [from, setFrom] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [err, setErr] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");

  const checkHandler = () => {
    setUseCurrenP((state) => !state);
  };

  const findPathHandler = (latLng) => {
    setFrom(latLng);
  };

  const onTravelMethodChange = (val) => {
    getPathRes(val);
  };

  const getPathRes = useCallback(
    async (travelMethod) => {
      /* eslint-disable no-undef */
      setErr(null);
      if (travelMethod) setTravelMode(travelMethod);

      const directionServices = new google.maps.DirectionsService();
      const res = await directionServices.route({
        origin: from,
        destination: { lat: toLat, lng: toLng },
        travelMode: travelMethod || "DRIVING",
        region: "SE",
      });

      setRes(res);
      setDistance(res.routes[0].legs[0].distance.text);
      setDuration(res.routes[0].legs[0].duration.text);
    },
    [from, toLat, toLng, setRes]
  );

  useEffect(() => {
    if (useCurrentP) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFrom({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setFrom(null);
    }
    return () => {};
  }, [useCurrentP]);

  if (duration && distance)
    return (
      <>
        <div className={classes.cats}>
          <CategoryButton
            belongsTo="travelmode"
            value="DRIVING"
            name="Bil"
            icon={carIcon}
            isChecked={travelMode === "DRIVING"}
            onChangeHandler={onTravelMethodChange}
          />
          <CategoryButton
            belongsTo="travelmode"
            value="BICYCLING"
            name="Cykel"
            icon={bikeIcon}
            isChecked={travelMode === "BICYCLING"}
            onChangeHandler={onTravelMethodChange}
          />
          <CategoryButton
            belongsTo="travelmode"
            value="WALKING"
            name="Gående"
            icon={walkingIcon}
            isChecked={travelMode === "WALKING"}
            onChangeHandler={onTravelMethodChange}
          />
        </div>
        <div className={classes.time}>
          <h1>Resans varaktighet: {duration}</h1>
          <h1>Sträcka: {distance}</h1>
        </div>
      </>
    );
  return (
    <div className={classes.directions}>
      <p>Till: {name}</p>
      {!useCurrentP ? (
        <MapSearch
          placeholder="Var ifrån?"
          className={classes.search}
          panTo={findPathHandler}
        />
      ) : (
        <p onClick={checkHandler}>
          Från: <img src={compass} className={classes.img} alt="compass" /> Min
          Plats
        </p>
      )}
      <div className={classes.checkbox}>
        <label htmlFor="currentLocation">
          Från min nuvarande plats{" "}
          <img src={compass} className={classes.img} alt="compass" />
        </label>
        <input
          type="checkbox"
          id="currentLocation"
          checked={useCurrentP}
          onChange={checkHandler}
        />
      </div>
      {err && <p>Somthing went wrong! Try again</p>}
      <Button
        onClick={() => {
          getPathRes("DRIVING");
        }}
      >
        Hitta Vägen
      </Button>
    </div>
  );
};

export default Directions;
