import * as React from "react";
import { useState, useMemo } from "react";
import { useControl, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { point } from "@turf/helpers";
/* const GeocoderControlProps = {
  mapboxAccessToken: String,
  origin?: string
} */
const TOKEN =
  "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

// Agregar la lista de sitios definidos para buscar
var customData = {
  features: [
    {
      type: "Feature",
      properties: {
        title: "Parque la Florida",
      },
      geometry: {
        coordinates: [-74.14476235609635, 4.730750597247051],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        title: "Parque del Café",
      },
      geometry: {
        coordinates: [-75.77064810284882, 4.540568666186622],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        title: "Parque Arqueologico San Agustin",
      },
      geometry: {
        coordinates: [-76.29526180284667, 1.8879367358700043],
        type: "Point",
      },
    },
  ],
  type: "FeatureCollection",
};
const estaciones = [
  { title: "zzzzzzzzzz", coordinates: [-74.35525, 4.312917] },
  { title: "estación B", coordinates: [-74.334125, 4.311908] },
];
const estacionesGeoJSON = () => {
  return {
    type: "FeatureCollection",
    features: estaciones.map((estacion) =>
      point(estacion.coordinates, estacion.title)
    ),
  };
};

export default function GeocoderControl({ estacionesGeoJSON }) {
  function forwardGeocoder(query) {
    var matchingFeatures = [];

    for (var i = 0; i < estacionesGeoJSON.features.length; i++) {
      var feature = estacionesGeoJSON.features[i];
      // Handle queries with different capitalization
      // than the source data by calling toLowerCase().

      if (feature.properties.toLowerCase().search(query.toLowerCase()) !== -1) {
        // Add a tree emoji as a prefix for custom
        // data results using carmen geojson format:
        // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        feature["place_name"] = "🌲 " + feature.properties;
        feature["center"] = feature.geometry.coordinates;
        feature["place_type"] = ["place"];
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }
  const geocoder = useControl(() => {
    const ctrl = new MapboxGeocoder({
      accessToken: TOKEN,
      localGeocoder: forwardGeocoder,
      localGeocoderOnly: true,
      mapboxgl: mapboxgl,
    });

    return ctrl;
  });
  return null;
}
