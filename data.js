// Create map
var map = L.map('map').setView([0, 0], 2);

// Add tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize all the LayerGroups that we'll use.
let layers = {
    BIGFOOT_SIGHTINGS: new L.LayerGroup(),
    UFO_SIGHTINGS: new L.LayerGroup(),
};

// Add the layer groups to the map initially
layers.BIGFOOT_SIGHTINGS.addTo(map);
layers.UFO_SIGHTINGS.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
    "Bigfoot Sightings": layers.BIGFOOT_SIGHTINGS,
    "UFO Sightings": layers.UFO_SIGHTINGS,
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
let info = L.control({
    position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML = '<h4>Legend</h4><i style="background: #ff7800"></i> Bigfoot Sightings<br><i style="background: #0080ff"></i> UFO Sightings';
    return div;
};

// Add the info legend to the map.
info.addTo(map);

// Add JSON files
d3.json('bigfoot_map_data.json').then(data => {
    console.log(data); // Process your JSON data here
    // Example: Adding markers to the BIGFOOT_SIGHTINGS layer
    data.sightings.forEach(sighting => {
        let marker = L.marker([sighting.latitude, sighting.longitude], { icon: bigfootIcon }) // Use bigfootIcon
            .bindPopup(`<b>Location:</b> ${sighting.location}<br><b>Date:</b> ${sighting.date}`)
            .addTo(layers.BIGFOOT_SIGHTINGS);
    });
}).catch(error => {
    console.error('Error loading the JSON data:', error);
});

  // Add JSON files (ufo)
  d3.json('ufo_map_data.json').then(data => {
    console.log(data); // Process your JSON data here
    // Example: Adding markers to the UFO_Sightings layer
    data.sightings.forEach(sighting => {
        let marker = L.marker([sighting.latitude, sighting.longitude])
            .bindPopup(`<b>Location:</b> ${sighting.location}<br><b>Date:</b> ${sighting.date}`)
            .addTo(layers.BIGFOOT_SIGHTINGS);
    });
}).catch(error => {
    console.error('Error loading the JSON data:', error);
});

// Bigfoot icon
var bigfootIcon = L.icon({
    iconUrl: 'bigfoot.png',
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// UFO icon
var ufoIcon = L.icon({
    iconUrl: 'ufo.png',
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});