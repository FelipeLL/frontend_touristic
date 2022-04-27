import React, { useState, useMemo, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
//import mapboxgl from "mapbox-gl";
import axios from "axios";
import { point } from "@turf/helpers";
import GeocoderControl from "./GeocoderControl";
import DirectionsControl from "./DirectionsControl";
import Slider from "./Slider";
import iconMarker from "../images/icons8-html-5.svg";
const MapView = () => {
  //estado inicial de la vista
  const initialState = {
    longitude: -74.3564647,
    latitude: 4.290859,
    zoom: 13,
  };

  useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, []);

  //establecer vista
  const [viewState, setViewState] = useState(initialState);
  const [slider, setSlider] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState(false);

  //establecen los limites del mapa
  const bounds = [
    [-74.453816, 4.213004], //Southwest coords
    [-74.209108, 4.378892], //Northeast coords
  ];
  /* const estaciones = [
    { title: "Estación A", coordinates: [-74.35525, 4.312917] },
    { title: "Estación B", coordinates: [-74.334125, 4.311908] },
  ]; */

  //representar los marcadores en la misma posición de cada punto
  const markers = useMemo(() => {
    return data.map((estacion) => (
      <Marker
        key={estacion.ID_Estacion}
        longitude={estacion.longitud}
        latitude={estacion.latitud}
        color="#FBBC05"
        onClick={() => {
          setSlider(!slider);
          console.log(slider);
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

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#000",
    },
  };

  return (
    <>
      <Map
        //sirve para mostrar la vista
        {...viewState}
        //configuración para un correcto funcionamiento de la vista cuando esta en movimiento
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: "0",
          top: "0",
        }}
        // maxBounds={bounds}
        mapboxAccessToken="pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbmc2MGIwMGFhM2NxYjNkMjJnNHl6In0.4DpT3U9E6A9nzbxdb_6vHg"
        mapStyle="mapbox://styles/jfelipeladino/cl1yho734000414o5b4b0j9xe"
      >
        {/* {markers} */}

        <Marker
          longitude={-74.35525}
          latitude={4.312917}
          // anchor="bottom"
          color="#000"
          onClick={() => setSlider(!slider)}
        />
        <Slider slider={slider} />
        {/* {slider && <Slider />} */}
        {/* <Source id="estaciones" type="geojson" data={estacionesGeoJSON}>
          <Layer {...layerStyle} />
        </Source> */}
        {data.length !== 0 ? (
          <>
            {/* <GeocoderControl estacionesGeoJSON={estacionesGeoJSON} /> */}
            {/* <DirectionsControl estacionesGeoJSON={estacionesGeoJSON} /> */}
          </>
        ) : (
          console.log("no hay datos")
        )}
        {/* <GeocoderControl estacionesGeoJSON={estacionesGeoJSON} /> */}
      </Map>
    </>
  );
};

export default MapView;
