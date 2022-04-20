import React, { useState, useMemo } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { point } from "@turf/helpers";
import GeocoderControl from "./GeocoderControl";

const MapView = () => {
  //estado inicial de la vista
  const initialState = {
    longitude: -74.3564647,
    latitude: 4.290859,
    zoom: 13,
  };
  //establecer vista
  const [viewState, setViewState] = useState(initialState);
  const [slider, setSlider] = useState(false);

  //establecen los limites del mapa
  const bounds = [
    [-74.453816, 4.213004], //Southwest coords
    [-74.209108, 4.378892], //Northeast coords
  ];
  const estaciones = [
    { title: "Estación A", coordinates: [-74.35525, 4.312917] },
    { title: "Estación B", coordinates: [-74.334125, 4.311908] },
  ];

  //esta función itera cada una de las estaciones almacenadas en la bd y los muestra en el mapa
  const estacionesGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: estaciones.map((estacion) =>
        point(estacion.coordinates, estacion.title)
      ),
    };
  }, [estaciones]);

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
        }}
        maxBounds={bounds}
        mapboxAccessToken="pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbmc2MGIwMGFhM2NxYjNkMjJnNHl6In0.4DpT3U9E6A9nzbxdb_6vHg"
        mapStyle="mapbox://styles/jfelipeladino/cl1yho734000414o5b4b0j9xe"
      >
        {/* <Marker
          longitude={-74.35525}
          latitude={4.312917}
          anchor="bottom"
          color="#FBBC05"
          onClick={() => setSlider(true)}
        /> */}
        <Source id="estaciones" type="geojson" data={estacionesGeoJSON}>
          <Layer {...layerStyle} />
        </Source>
        <GeocoderControl estacionesGeoJSON={estacionesGeoJSON} />
      </Map>
    </>
  );
};

export default MapView;
