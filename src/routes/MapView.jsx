import React, { useState, useMemo, useEffect, useContext } from "react";
import Map, {
  Marker,
  GeolocateControl,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl";
import axios from "axios";
import { point } from "@turf/helpers";
import GeocoderControl from "../components/GeocoderControl";
import SliderStation from "../components/SliderStation";
import Admin from "../components/Admin";
import { UserContext } from "../context/UserProvider";
import Logout from "../components/Logout";
import OpenConfig from "../components/OpenConfig";
import OpenProfile from "../components/OpenProfile";
import Profile from "../components/Profile";
import Indications from "../components/Indications";

const MapView = () => {
  //estado inicial de la vista
  const initialState = {
    longitude: -74.3464647,
    latitude: 4.311859,
    zoom: 13,
  };
  const { upload, setUpload } = useContext(UserContext);
  useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
      setUpload(false);
    };
    axiosData();
  }, [upload]);

  //establecer vista
  const [viewState, setViewState] = useState(initialState);
  const [sliderStation, setSliderStation] = useState(false);
  const [sliderConfig, setSliderConfig] = useState(false);
  const [sliderProfile, setSliderProfile] = useState(false);
  const [data, setData] = useState([]);
  const [estacion, setEstacion] = useState(0);
  const { admin, directions } = useContext(UserContext);
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
        color="#fff"
        onClick={() => {
          setSliderStation(true);
          setEstacion(estacion.ID_Estacion);
        }}
      >
        {/* <Point svg={"animal"} /> */}
        <img src={estacion.icono.url} alt="img" />
      </Marker>
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

  const layerStyle = {
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#be0027",
      "line-width": 8,
    },
  };

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          properties: {},
          coordinates:
            Object.entries(directions).length === 0
              ? ""
              : directions.geometry.coordinates,
        },
      },
    ],
  };

  return (
    <>
      <Map
        {...viewState}
        dragRotate={false}
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
        <SliderStation
          sliderStation={sliderStation}
          setSliderStation={setSliderStation}
          estacion={estacion}
          data={data}
        />
        <Source type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>

        <Indications />

        {admin ? (
          <>
            <Admin
              sliderConfig={sliderConfig}
              setSliderConfig={setSliderConfig}
            />
            <OpenConfig setSliderConfig={setSliderConfig} />
          </>
        ) : (
          <>
            <Profile
              sliderProfile={sliderProfile}
              setSliderProfile={setSliderProfile}
            />
            <OpenProfile
              sliderProfile={sliderProfile}
              setSliderProfile={setSliderProfile}
            />
          </>
        )}

        {data.length !== 0 ? (
          <>
            <GeocoderControl estacionesGeoJSON={estacionesGeoJSON} />

            {/* <DirectionsControl estacionesGeoJSON={estacionesGeoJSON} /> */}
          </>
        ) : (
          console.log("no hay datos")
        )}
        <GeolocateControl
          position="top-left"
          trackUserLocation="true"
          showUserHeading="true"
        />
        <NavigationControl showCompass={false} position="top-left" />

        <Logout />
      </Map>
    </>
  );
};

export default MapView;
