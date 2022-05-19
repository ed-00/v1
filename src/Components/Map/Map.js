import React, { useCallback, useState, useRef, useEffect } from "react";
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

import expandIcon from "../../icons/expand.svg";

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

const mainZoom = 12.9;

// Map component
const Map = () => {
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
  const [visibleCategory, setVisibleCategory] = useState([]);
  const [pathsAreVisiable, setPathsAreVisiable] = useState({
    walking: true,
    biking: true,
  });
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (poiData) {
      poiData.Categories.forEach((element) => {
        setVisibleCategory((prevState) => [...prevState, true]);
        setCategoriesList((prevState) => [...prevState, element.type]);
      });
    }
  }, [poiData]);

  // Points logic
  const [poiPoints, setPoiPoints] = useState();
  useEffect(() => {
    if (poiData && isLoaded && !loadError) {
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
  }, [isLoaded, loadError, panTo, poiData]);
  // Filter logic
  const [maxDist, setMaxDist] = useState(100);
  const [distances, setDistances] = useState([]);
  const [Filter, setFilter] = useState(false);
  const [maxDistHiking, setmaxDistHiking] = useState([]);
  const [maxDistBiking, setmaxDistBiking] = useState([]);

  useEffect(() => {
    if (!Filter) {
      setDistances([]);
      setmaxDistHiking([]);
      setmaxDistBiking([]);
      setMaxDist(100);
    }
  }, [Filter]);

  // Category expand
  const [expandCategories, setExpandCategories] = useState(true);

  if (loadError || bikingHasError || hikingHasError || poiHasError)
    return <FourOFour />;
  if (!isLoaded || hikingDataIsLoading || bikingDataIsLoading || poiIsloading)
    return <LoadingSpinner />;

  return (
    <div className={classes.map}>
      <div className={classes.navButtons}>
        <LocateMe panTo={panTo} />
        <FilterButton home={true} onClick={() => panTo(center, true, 10)} />
        <FilterButton
          onClick={() => {
            setFilter((prevState) => !prevState);
            exitMarkerHandler();
            setAddPoint(null);
            setCenterPin(null);
          }}
        />
      </div>
      <div className={classes.checkboxes}>
        <ul
          className={`${classes[`ks-cboxtags`]} ${
            expandCategories && classes.hidden
          }`}
        >
          <CategoryCheckbox
            checked={pathsAreVisiable.walking}
            label="walking Path"
            onChange={() => {
              setPathsAreVisiable((state) => {
                let prevState = state;
                prevState.walking = !prevState.walking;
                return { ...prevState };
              });
            }}
          />

          <CategoryCheckbox
            checked={pathsAreVisiable.biking}
            label="Biking Path"
            onChange={() => {
              setPathsAreVisiable((state) => {
                let prevState = state;
                prevState.biking = !prevState.biking;
                return { ...prevState };
              });
            }}
          />

          {poiData &&
            poiData.Categories.map((el, index) => (
              <CategoryCheckbox
                label={el.type}
                key={el.type}
                checked={visibleCategory[index]}
                onChange={() => {
                  setVisibleCategory((prevState) => {
                    let newArray = prevState;
                    newArray[index] = !newArray[index];
                    return [...newArray];
                  });
                }}
              />
            ))}
        </ul>
        <button
          onClick={() => {
            setExpandCategories((prevState) => !prevState);
          }}
        >
          <img src={expandIcon} alt="expand" />
        </button>
      </div>

      <MapNav
        panTo={panTo}
        onClear={() => {
          setCenterPin(null);
        }}
      />

      {poiData && Filter && (
        <FilterMenu
          panTo={panTo}
          points={poiData}
          bikingData={bikingData}
          hikingData={hikingData}
          setmaxDistHiking={setmaxDistHiking}
          setmaxDistBiking={setmaxDistBiking}
          setMaxDist={setMaxDist}
          maxDist={maxDist}
          setDistances={setDistances}
          onCancel={() => {
            setFilter(false);
          }}
          onClear={() => {
            setFilter(false);
          }}
        />
      )}

      {addPoint && categoriesList && (
        <AddPoints
          point={addPoint}
          categoriesList={categoriesList}
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
        options={{
          styles: mapStyle,
          mapTypeControlOptions: {
            // eslint-disable-next-line no-undef
            position: google.maps.ControlPosition.BOTTOM_CENTER,
            // eslint-disable-next-line no-undef
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          },
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl:false,
        }}
        mapContainerStyle={mapContainerStyle}
        region="SE"
        onDblClick={onMapClickHandler}
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
          pathsAreVisiable.walking &&
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
              paths: [...line.posts],
              zIndex: 1,
            };
            if (maxDistHiking.length > 0) {
              if (maxDistHiking[index] < maxDist) {
                return (
                  <Polyline key={index} path={line.posts} options={options} />
                );
              } else {
                return null;
              }
            } else {
              return (
                <Polyline key={index} path={line.posts} options={options} />
              );
            }
          })}
        {bikingData &&
          pathsAreVisiable.biking &&
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
              paths: [...line.posts],
              zIndex: 1,
            };
            if (maxDistBiking.length > 0) {
              if (maxDistBiking[index] < maxDist) {
                return (
                  <Polyline key={index} path={line.posts} options={options} />
                );
              } else {
                return null;
              }
            } else {
              return (
                <Polyline key={index} path={line.posts} options={options} />
              );
            }
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
