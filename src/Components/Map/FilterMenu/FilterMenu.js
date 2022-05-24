import React, { useState, useEffect, useCallback } from "react";
import classes from "./FilterMenu.module.css";
import MapSearch from "../MapNav/MapSearch/MapSearch";
import compass from "../../../icons/location.svg";
import close from "../../../icons/close.svg";
import { Slider } from "@mui/material";
import { motion } from "framer-motion";

const FilterMenu = ({
  panTo,
  points,
  maxDist,
  setMaxDist,
  setDistances,
  onClear,
  onCancel,
  hikingData,
  bikingData,
  setmaxDistHiking,
  setmaxDistBiking,
}) => {
  const [useCurrentP, setUseCurrentP] = useState(false);
  const checkHandler = () => {
    setUseCurrentP((state) => {
      return !state;
    });
  };

  const calcDist = useCallback(
    (cordinates) => {
      const distanceArray = [];
      points.Categories.forEach((category, categoryIndex) => {
        distanceArray.push(new Array(category.points.length));
        category.points.forEach((point, pointIndex) => {
          var radlat1 = (Math.PI * point.lat) / 180;
          var radlat2 = (Math.PI * cordinates.lat) / 180;
          var theta = point.lng - cordinates.lng;
          var radtheta = (Math.PI * theta) / 180;
          var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = (dist * 180) / Math.PI;
          dist = dist * 60 * 1.1515;
          dist = dist * 1.609344;
          distanceArray[categoryIndex][pointIndex] = dist;
        });
        setDistances(distanceArray);
      });
    },
    [points.Categories, setDistances]
  );

  const getDistance = useCallback((point, cordinates) => {
    var radlat1 = (Math.PI * point.lat) / 180;
    var radlat2 = (Math.PI * cordinates.lat) / 180;
    var theta = point.lng - cordinates.lng;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }, []);

  const findTheFurthestDist = useCallback(
    (cordinates, LineArray) => {
      return LineArray.map((line) => {
        let minHikingDist = 0;
        line.posts.forEach((point) => {
          let hikingDist = getDistance(point, cordinates);
          minHikingDist = hikingDist;
          if (hikingDist <= minHikingDist) {
            minHikingDist = hikingDist;
          }
        });
        return minHikingDist;
      });
    },
    [getDistance]
  );

  useEffect(() => {
    if (useCurrentP) {
      navigator.geolocation.getCurrentPosition((position) => {
        const cordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        calcDist(cordinates);
        setmaxDistBiking(findTheFurthestDist(cordinates, bikingData));
        setmaxDistHiking(findTheFurthestDist(cordinates, hikingData));
        panTo(cordinates, true, 9.5);
      });
    }
    return () => {};
  }, [
    bikingData,
    calcDist,
    findTheFurthestDist,
    hikingData,
    panTo,
    setmaxDistBiking,
    setmaxDistHiking,
    useCurrentP,
  ]);

  return (
    <motion.div
      animate={{ y: -200 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={classes[`filter-menu`]}
    >
      <img
        src={close}
        alt={close}
        className={classes[`filter-menu-img`]}
        onClick={() => {
          onClear();
          onCancel();
        }}
      />
      <h1>Filter</h1>
      <div className={classes.slider}>
        <p>Distans i KM</p>
        <Slider
          aria-label="Distans"
          valueLabelDisplay="auto"
          step={0.01}
          min={1}
          max={1000}
          value={maxDist}
          onChange={(_, value) => {
            setMaxDist(value);
          }}
          sx={{
            color: "#38D5BC",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgb(0 0 0 / 16%)",
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
      </div>

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
      {!useCurrentP ? (
        <MapSearch
          placeholder="Var ifrån?"
          panTo={(cordinates) => {
            panTo(cordinates, true, 9.5);
          }}
          onClear={() => {
            setDistances([]);
            setMaxDist(100);
          }}
          onSelect={(cordinates) => {
            calcDist(cordinates);
            setmaxDistBiking(findTheFurthestDist(cordinates, bikingData));
            setmaxDistHiking(findTheFurthestDist(cordinates, hikingData));
          }}
        />
      ) : (
        <p onClick={checkHandler} className={classes.from}>
          Från: <img src={compass} className={classes.img} alt="compass" /> Min
          Plats
        </p>
      )}
    </motion.div>
  );
};
export default FilterMenu;
