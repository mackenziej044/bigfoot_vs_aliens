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

// Load both datasets using Promise.all
const bigfootpromise = 'bigfoot_map_data.csv'
const ufopromise = 'ufo_map_data.csv'

Promise.all([
    d3.csv('bigfoot_map_data_test10.csv'),
        d3.csv('ufo_map_data_test10.csv')
]).then(([bigfootData, ufoData]) => {
    console.log(bigfootData)
    console.log(ufoData)
    // Process Bigfoot sightings data
    bigfootData.forEach(row => {
        let marker = L.marker([row.latitude, row.longitude], { icon: bigfootIcon })
            .bindPopup(`<b>Date:</b> ${row.date} <br><b>Classification:</b> ${row.classification} <br><b>Report Number:</b> ${row.report_number}`)
            .addTo(layers.BIGFOOT_SIGHTINGS);
    });

    // Process UFO sightings data
    ufoData.forEach(sighting => {
        let marker = L.marker([sighting.latitude, sighting.longitude], { icon: ufoIcon })
            .bindPopup(`<b>Date:</b> ${sighting.date} <br><b>Shape:</b> ${sighting.shape}<br><b>Duration:</b> ${sighting.duration_hours_min}`)
            .addTo(layers.UFO_SIGHTINGS);
    });
}).catch(error => {
    console.error('Error loading the datasets:', error);
});

// Bigfoot icon (REVISIT)
var bigfootIcon = L.icon({
    iconUrl: 'bigfoot.png',
    iconSize: [10, 10], // size of the icon
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

// UFO icon
var ufoIcon = L.icon({
    iconUrl: 'ufo.png',
    iconSize: [15, 15], // size of the icon
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

// Promise.all([
//     d3.csv("bigfoot_map_data.csv"),
//     d3.csv("ufo_map_data.csv"),
// ]).then(function(files) { 
//     console.log(files)
//     console.log(files[0]),
//     console.log(files[1])
//     // files[0] will contain file1.csv
//     // files[1] will contain file2.csv
// }).catch(function(err) {
//     // handle error here

// })

// // conSize
// Point
// null
// Size of the icon image in pixels.
// iconAnchor
// Point
// null
// The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.
// popupAnchor
// Point
// [0, 0]
// The coordinates of the point from which popups will "open", relative to the icon anchor.
// tooltipAnchor
// Point
// [0, 0]
// The coordinates of the point from which tooltips will "open", relative to the icon anchor.
// shadowSize
// Point
// null
// Size of the shadow image in pixels.
// shadowAnchor
// Point
// null
// The coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified).