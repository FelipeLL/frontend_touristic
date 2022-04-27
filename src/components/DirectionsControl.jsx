import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useControl } from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";

export default function DirectionsControl({ estacionesGeoJSON }) {
  console.log(estacionesGeoJSON);
  function forwardGeocoder(query) {
    console.log(query);
    var matchingFeatures = [];
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
        // localGeocoder: forwardGeocoder,
      },
    });

    /* ctrl.setOrigin([-74.453816, 4.213004]);
    ctrl.setDestination([-74.209108, 4.378892]); */
    ctrl.addWaypoint(0, [-74.453816, 4.213004]);
    ctrl.removeRoutes();
    return ctrl;
  });

  return null;
}
