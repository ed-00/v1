import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../Hooks/useFech";

import {
  GoogleMap,
  Polyline,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import FourOFour from "../UI/4o4/FourOFour";
import MapNav from "./MapNav/MapNav";
import MarkerInfo from "./MarkerInfo/MarkerInfo";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AddPoints from "./AddPoints/AddPoints";

import classes from "./Map.module.css";
import mapStyle from "./MapData/MapStyles";
import LocateMe from "./LocateMe/LocateMe";
import placeIcon from "../../icons/place.svg";
import CategoryCheckbox from "../UI/CategoryCheckbox/CategoryCheckbox";
import FilterButton from "./FilterButton/FilterButton";
import FilterMenu from "./FilterMenu/FilterMenu";

// Google map attribut
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 60.2242741220376,
  lng: 16.80668675723175,
};
const mapOptions = {
  styles: mapStyle,
  disableDefaultUI: true,
};
const mainZoom = 12.9;

// Map component
const Map = () => {
  //Fetching mechanism Works
  const { bikingIsSelected, hikingIsSelected } = useSelector(
    (state) => state.CategorySlice
  );

  const {
    isLoading: hikingDataIsLoading,
    hasError: hikingHasError,
    data: hikingData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/walking-data-no-elevation.json"
  );
  const {
    isLoading: bikingDataIsLoading,
    hasError: bikingHasError,
    data: bikingData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/biking-data-elevation.json"
  );

  const {
    isLoading: poiIsloading,
    hasError: poiHasError,
    data: poiData,
    setData: setPoiData,
  } = useFetch(
    "https://disturberade-gis-default-rtdb.europe-west1.firebasedatabase.app/poi.json"
  );

  //Marker info
  const [markerSelected, setMarkerSelected] = useState(null);
  const [centerPin, setCenterPin] = useState(null);

  //loading Mechanisem
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
    region: "SE",
  });

  // map ref
  const mapRef = useRef(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Pan To
  const panTo = useCallback(({ lat, lng }, centerPin, zoom) => {
    mapRef.current.panTo({ lat, lng });
    if (zoom) mapRef.current.setZoom(zoom);
    else mapRef.current.setZoom(14);
    if (!centerPin) setCenterPin({ lat, lng });
  }, []);

  //exit marker handler
  const exitMarkerHandler = useCallback(() => {
    setDirectionRes(null);
    setMarkerSelected(null);
    setDirectionMode(false);
  }, []);

  // add point
  const [addPoint, setAddPoint] = useState(null);

  // onMapClick
  var onMapClickHandler = useCallback(
    (event) => {
      exitMarkerHandler();
      setAddPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      panTo({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setFilter(false);
      setMaxDist(100);
      setDistances([]);
    },
    [exitMarkerHandler, panTo]
  );

  // getDirectionsHandler
  const [directionMode, setDirectionMode] = useState(false);
  const [directionsRes, setDirectionRes] = useState(null);

  const getDirectionsHandler = useCallback(() => {
    setDirectionMode(true);
  }, []);

  useEffect(() => {
    setDirectionMode(false);
    setDirectionRes(null);
  }, [markerSelected]);

  // categories
  const [categoryCheckbox, setCategoryCheckbox] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState([]);

  useEffect(() => {
    if (poiData) {
      poiData.Categories.forEach(() => {
        setVisibleCategory((prevState) => [...prevState, true]);
      });
    }
  }, [poiData]);
  useEffect(() => {
    if (poiData) {
      poiData.Categories.forEach((el, index) => {
        setCategoryCheckbox((prevState) => [
          ...prevState,
          <CategoryCheckbox
            label={el.type}
            key={el.type}
            checked={visibleCategory[index]}
            onChange={() => {
              setVisibleCategory((prevState) => {
                let newArray = prevState;
                newArray[index] = !prevState[index];
                return [...newArray];
              });
            }}
          />,
        ]);
      });
    }
    return () => {
      setCategoryCheckbox([]);
    };
  }, [poiData, visibleCategory]);

  const [poiPoints, setPoiPoints] = useState();

  useEffect(() => {
    if (poiData) {
      setPoiPoints((prevState) =>
        poiData.Categories.map((el) => {
          return [
            ...prevState,

            el.points.map((point, index) => {
              return (
                <Marker
                  key={index + Math.random()}
                  icon={{
                    url: el.icon,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                  visible={true}
                  position={{ lat: point.lat, lng: point.lng }}
                  onClick={() => {
                    panTo({ lat: point.lat, lng: point.lng + 0.019 }, true);
                    setMarkerSelected(point);
                    setDirectionRes(null);
                    setDirectionMode(false);
                    setAddPoint(null);
                    setCenterPin(null);
                    setFilter(false);
                    setMaxDist(100);
                    setDistances([]);
                  }}
                />
              );
            }),
          ];
        })
      );
    }
    return () => {
      setPoiPoints([]);
    };
  }, [panTo, poiData]);
  // Filter logic
  const [maxDist, setMaxDist] = useState(100);
  const [distances, setDistances] = useState([]);
  const [Filter, setFilter] = useState(false);

  if (loadError || bikingHasError || hikingHasError || poiHasError)
    return <FourOFour />;
  if (!isLoaded || hikingDataIsLoading || bikingDataIsLoading || poiIsloading)
    return <LoadingSpinner />;

  return (
    <div className={classes.map}>
      <LocateMe panTo={panTo} />

      {categoryCheckbox && (
        <div className={classes.checkboxes}>
          <ul className={classes[`ks-cboxtags`]}>{categoryCheckbox}</ul>
        </div>
      )}

      <MapNav
        panTo={panTo}
        onClear={() => {
          setCenterPin(null);
        }}
      />

      <FilterButton
        onClick={() => {
          setFilter(true);
          exitMarkerHandler();
          setAddPoint(null);
          setCenterPin(null);
        }}
      />
      <FilterButton home={true} onClick={() => panTo(center, true, 10)} />
      {poiData && Filter && (
        <FilterMenu
          panTo={panTo}
          points={poiData}
          setMaxDist={setMaxDist}
          maxDist={maxDist}
          setDistances={setDistances}
          onCancel={() => {
            setFilter(false);
          }}
          onClear={() => {
            setDistances([]);
            setMaxDist(100);
          }}
        />
      )}

      {addPoint && (
        <AddPoints
          point={addPoint}
          setPoiData={setPoiData}
          onCancel={() => {
            setAddPoint(null);
            setCenterPin(null);
          }}
          data={poiData}
        />
      )}
      <GoogleMap
        center={center}
        zoom={mainZoom}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        region="SE"
        onClick={onMapClickHandler}
        onLoad={onMapLoad}
      >
        {poiPoints &&
          poiPoints.map((marker, index) => {
            if (!visibleCategory[index]) {
              return null;
            } else {
              return marker.map((points) => {
                return points.map((point, pointIndex) => {
                  if (distances.length > 0) {
                    if (distances[index][pointIndex] < maxDist) {
                      return point;
                    } else {
                      return null;
                    }
                  } else {
                    return point;
                  }
                });
              });
            }
          })}
        {directionsRes && <DirectionsRenderer directions={directionsRes} />}
        {hikingData &&
          !hikingDataIsLoading &&
          hikingData.map((line, index) => {
            const options = {
              strokeColor: "#2b9e98",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              fillColor: "#2b9e98",
              fillOpacity: 1,
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
              strokeColor: "#a66930",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              fillColor: "#a66930",
              fillOpacity: 1,
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

        {centerPin && (
          <Marker
            position={centerPin}
            icon={{
              url: placeIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>

      {markerSelected && (
        <MarkerInfo
          name={markerSelected.name}
          text={markerSelected.description}
          images={markerSelected.imgs}
          lat={markerSelected.lat}
          lng={markerSelected.lng}
          onExit={exitMarkerHandler}
          getDirection={getDirectionsHandler}
          directionMode={directionMode}
          setRes={setDirectionRes}
        />
      )}
    </div>
  );
};

export default Map;
