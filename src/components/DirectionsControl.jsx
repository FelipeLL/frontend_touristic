import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useControl } from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

export default function DirectionsControl({ geoLocation }) {
  const directions = useControl(() => {
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
        instructions: false,
      },
    });

    return ctrl;
  });

  return null;
}
