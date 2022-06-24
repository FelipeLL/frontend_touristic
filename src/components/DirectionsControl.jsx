//import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useState } from "react";

import { useControl } from "react-map-gl";

export default function DirectionsControl({ currentPosition }) {
  const TOKEN =
    "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

  useControl(() => {
    const ctrl = new MapboxDirections({
      accessToken: TOKEN,
      unit: "metric",
      profile: "mapbox/walking",
      language: "es-MX",
      interactive: true,
      placeholderOrigin: "Elige un lugar de inicio",
      placeholderDestination: "Elige el destino",

      geocoder: {
        proximity: [-74.3564647, 4.290859],
        country: "co",
      },
      controls: {
        instructions: true,
        inputs: true,
      },
    });
    /* if (currentPosition) {
      console.log(currentPosition.length);
    } */

    return ctrl;
  });

  return null;
}
