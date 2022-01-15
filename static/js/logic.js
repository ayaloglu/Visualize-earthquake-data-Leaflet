var myMap = L.map('map', {
	center: [40.7830, -100.1005],
	zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(URL).then(function(response) {
    
  
    // Loop through data
    for (var i = 0; i < response.features.length; i++) {
  
      // Set the data location property to a variable
      var location = response.features[i];
  
    

      function setColor(depth){
        var hue = Math.floor(depth);

       
        var b = Math.floor(255 * (hue / 100)),
            r = Math.floor(255 * (100 - hue) / 100),
            g = 0;
        
            return  "rgb(" + r + "," + g + "," + b + ")"     }

      // Check for location property
      if (location) {
        
      
        // Add a new marker to the cluster group and bind a pop-up
         L.circle(   [  location.geometry.coordinates[1], location.geometry.coordinates[0]],{
            color: setColor(location.geometry.coordinates[2]),
            fillOpacity: 0.7,
  
            radius:30000 * location.properties.mag })
         .bindPopup("<h3>" + location.properties.place + "</h3>" + "Depth:" + location.geometry.coordinates[2]  + " km <br/>" + "Magnitude:" + location.properties.mag ).addTo(myMap);


     
      };
      // Set up the legend
    }
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0, 20 , 40, 60, 80, "100+"];
    var colors = [setColor(0),setColor(20), setColor(40), setColor(60), setColor(80), setColor(100)];
    var labels = [];

   // Add min & max
   var legendInfo = "<h2>Depth</h2>" +
   "<div class=\"labels\">" +
     "<div class=\"min\">" + limits[0] + "</div>" +
     "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
   "</div>";

 div.innerHTML = legendInfo;

 limits.forEach(function(limit, index) {
   labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
 });

 div.innerHTML += "<ul>" + labels.join("") + "</ul>";
 return div;

  }

    // Adding legend to the map
  legend.addTo(myMap);

});


  
  
  
  
