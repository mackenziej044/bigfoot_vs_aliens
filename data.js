// create map
var map = L.map('map').setView([0,0], 2);

// add tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Load the CSV data
Papa.parse("/Users/mackenzie/Documents/GitHub/bigfoot_vs_aliens/bfro_locations.csv", {
    header: true,
    download: true,
    complete: function(results) {
        // Loop through each row in the CSV
        results.data.forEach(function(row) {
            // Assuming your CSV has 'latitude' and 'longitude' columns
            var lat = row.latitude;
            var lng = row.longitude;

            // Create a marker and add it to the map
            var marker = L.marker([lat, lng]).addTo(myMap);
        });
    }
});