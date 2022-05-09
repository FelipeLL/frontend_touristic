import React, { useState, useMemo, useEffect, useContext } from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import axios from "axios";
import { point } from "@turf/helpers";
import GeocoderControl from "./GeocoderControl";
import DirectionsControl from "./DirectionsControl";
import Slider from "./Slider";
import Admin from "./Admin";
import { UserContext } from "../context/UserProvider";
import Logout from "./Logout";
import mapboxgl from "mapbox-gl";

const MapView = () => {
  mapboxgl.workerClass =
    require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; // eslint-disable-line
  //estado inicial de la vista
  const initialState = {
    longitude: -74.3464647,
    latitude: 4.311859,
    zoom: 13,
  };
  const { upload, setUpload } = useContext(UserContext);
  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://zoratamamap.herokuapp.com/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
      setUpload(false);
    };
    axiosData();
  }, [upload]);

  //establecer vista
  const [viewState, setViewState] = useState(initialState);
  const [slider, setSlider] = useState(false);
  const [data, setData] = useState([]);
  const [geoLocation, setGeoLocation] = useState({});
  const [estacion, setEstacion] = useState(0);
  const { admin, setAdmin } = useContext(UserContext);
  //establecen los limites del mapa
  const bounds = [
    [-74.453816, 4.213004], //Southwest coords
    [-74.209108, 4.478892], //Northeast coords
  ];

  //representar los marcadores en la misma posición de cada punto
  const markers = useMemo(() => {
    return data.map((estacion) => (
      <Marker
        key={estacion.ID_Estacion}
        longitude={estacion.longitud}
        latitude={estacion.latitud}
        color="#46afff"
        onClick={() => {
          setSlider(true);
          setEstacion(estacion.ID_Estacion);
        }}
      ></Marker>
    ));
  }, [data]);

  //esta función itera cada una de las estaciones almacenadas en la bd y los muestra en el mapa
  const estacionesGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: data.map((estacion) =>
        point([estacion.longitud, estacion.latitud], estacion.nombre)
      ),
    };
  }, [data]);

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: "0",
          top: "0",
        }}
        maxBounds={bounds}
        mapboxAccessToken="pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbmc2MGIwMGFhM2NxYjNkMjJnNHl6In0.4DpT3U9E6A9nzbxdb_6vHg"
        mapStyle="mapbox://styles/jfelipeladino/cl1yho734000414o5b4b0j9xe"
      >
        {markers}

        <Slider
          slider={slider}
          setSlider={setSlider}
          estacion={estacion}
          data={data}
        />
        {admin && <Admin />}

        {data.length !== 0 ? (
          <>
            <GeocoderControl estacionesGeoJSON={estacionesGeoJSON} />

            <DirectionsControl
              estacionesGeoJSON={estacionesGeoJSON}
              geoLocation={geoLocation}
            />
          </>
        ) : (
          console.log("no hay datos")
        )}
        <GeolocateControl
          position="top-left"
          trackUserLocation="true"
          showUserHeading="true"
          onGeolocate={(e) => {
            let location = {
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
            };

            setGeoLocation(location);
          }}
        />
        <Logout />
      </Map>
    </>
  );
};

export default MapView;
