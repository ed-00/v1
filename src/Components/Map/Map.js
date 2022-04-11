import React, { useCallback } from "react";
import {
  GoogleMap,
  Polyline,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import MapStyles from "./MapData/MapStyles";
import FourOFour from "../UI/4o4/FourOFour";
import MapNav from "./MapNav/MapNav";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import useFetch from "../../Hooks/useFech";
import { useSelector } from "react-redux";

// Google map attribut
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 60.288518,
  lng: 16.894292,
};
const mapOptions = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// Map component
const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  // onMapClick
  var onMapClickHandler = useCallback((event) => {
    alert(
      `${event.latLng.lat()},
       ${event.latLng.lng()},`
    );
  }, []);

  //Fetching mechanism Works
  const { canoeingIsSelected, bikingIsSelected, hikingIsSelected } =
    useSelector((state) => state.CategorySlice);

  const {
    isLoading: hikingDataIsLoading,
    hasError: hikingHasError,
    data: hikingData,
    setData: setWalkingData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/walking-data-no-elevation.json"
  );
  const {
    isLoading: bikingDataIsLoading,
    hasError: bikingHasError,
    data: bikingData,
    setData: setBikingData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/biking-data-elevation.json"
  );

  const {
    isLoading: canoeingIsLoading,
    hasError: canoeingHasError,
    data: canoeingData,
    setData: setCanoingData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/poi.json"
  );

  if (loadError || bikingHasError || hikingHasError) return <FourOFour />;
  if (!isLoaded || hikingDataIsLoading || bikingDataIsLoading)
    return <LoadingSpinner />;

  return (
    <>
      <MapNav />

      <GoogleMap
        center={center}
        zoom={10}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        onClick={onMapClickHandler}
      >
        {hikingData &&
          !hikingDataIsLoading &&
          hikingData.map((line, index) => {
            const options = {
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              geodesic: true,
              visible: hikingIsSelected,
              paths: [...line.posts],
              zIndex: 1,
            };
            return <Polyline key={index} path={line.posts} options={options} />;
          })}

        {bikingData &&
          !bikingDataIsLoading &&
          bikingData.map((line, index) => {
            const options = {
              strokeColor: "#FFFF00",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FFFF00",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              geodesic: true,
              visible: bikingIsSelected,
              paths: [...line.posts],
              zIndex: 1,
            };
            return <Polyline key={index} path={line.posts} options={options} />;
          })}

        {canoeingData &&
          !canoeingIsLoading &&
          canoeingData.posts.map((poi) => {
            return <Marker key={poi.name} position={{ lat: poi.lat, lng: poi.lng }} />;
          })}
      </GoogleMap>
    </>
  );
};

export default Map;

/* */
