// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9zc2Rib25lMSIsImEiOiJjbGNxN2N0NGwwMHVwM3ducHUyOGprdThvIn0.T4U7WNonzBBQt6orL3YcnA";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/bossdbone1/cldjk4n2n005o01lfltcicgcx"
});

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["socioeconomic-vulnerability"]
  });

  const town = map.queryRenderedFeatures(event.point, {
    layers: ["population-dynamics-9co1i2"]
  });

  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.statename}</h3><p>Index: <strong>${dzone[0].properties.nga_socioecon_profile_ctg}</strong> </p><p>Population: <strong>${town[0].properties.Population_2015}</strong> </p>`
    : `<p>Hover over a state!</p>`;

  document.getElementById("pd").innerHTML = town.length
    ? `<h3>${dzone[0].properties.statename}</h3><p>Index: <strong>${dzone[0].properties.nga_socioecon_profile_ctg}</strong> </p><p>Population: <strong>${town[0].properties.Population_2015}</strong> </p>`
    : `<p>Hover over a state!</p>`;

  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

map.on("load", () => {
  // the rest of the code will go in here
  const layers = ["<2", "2-3 ", "3-4 ", ">4 "];
  const colors = ["#feefd7", "#fdcc8b", "#fc8d5a", "#d6311f"];
  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement("div");
    const key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;

    const value = document.createElement("span");
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  });
  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 1
    }
  });
  map.addSource("hover", {
    type: "csv",
    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",
    type: "point",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "blue",
      "line-width": 1
    }
  });
});

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Nigeria", // Placeholder text for the search bar
  proximity: {
    longitude: 7.3986,
    latitude: 9.0765
  } // Coordinates of Nigeria center
});
map.addControl(geocoder, "top-left");
map.addControl(new mapboxgl.NavigationControl(), "top-left");