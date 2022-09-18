//import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import { useControl } from "react-map-gl";

export default function DirectionsControl({ estacionesGeoJSON }) {
  const TOKEN =
    "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

  function forwardGeocoder(query) {
    console.log(estacionesGeoJSON.features.length);

    var matchingFeatures = [];
    console.log("hola");
    for (var i = 0; i < estacionesGeoJSON.features.length; i++) {
      var feature = estacionesGeoJSON.features[i];
      // Handle queries with different capitalization
      // than the source data by calling toLowerCase().

      if (feature.properties.toLowerCase().search(query.toLowerCase()) !== -1) {
        // Add a tree emoji as a prefix for custom
        // data results using carmen geojson format:
        // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        feature["place_name"] = "🌍 " + feature.properties;
        feature["center"] = feature.geometry.coordinates;
        feature["place_type"] = ["place"];
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }

  useControl(() => {
    const ctrl = new MapboxDirections({
      accessToken: TOKEN,
      unit: "metric",
      profile: "mapbox/walking",
      language: "es-MX",
      interactive: false,
      placeholderOrigin: "Elige un lugar de inicio",
      placeholderDestination: "Elige el destino",

      geocoder: {
        proximity: [-74.3564647, 4.290859],
        country: "co",
        // localGeocoder: forwardGeocoder,
      },
      controls: {
        instructions: false,
        inputs: true,
        profileSwitcher: true,
      },
    });

    return ctrl;
  });

  return null;
}
