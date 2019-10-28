// Global variable
var mymap;
var restaurants = {};

// query URL base part
var queryURL = "https://developers.zomato.com/api/v2.1/geocode?";

// Object to hold query parameters
var queryParams = {};

/*
 * Function: to display the map
 */
function displayMap() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            // Get the current location coordinates
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // Draw map
            mymap = L.map('map').setView([lat, lon], 14);
    
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiemhlbnlhbmc5MjYxIiwiYSI6ImNqdGY3cnBsajA2cm4zeWxsbTM5MnA2dmkifQ.dBaV5k04d2oCmwoESzBmLg', {
                        maxZoom: 18,
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        id: 'mapbox.streets'
            }).addTo(mymap);
        
            //L.control.mapCenterCoord().addTo(mymap);

            // Add current location marker
            L.marker([lat, lon], {
                icon: new L.Icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    shadowSize: [41, 41]
                  })
              }).bindPopup("<b>You Are Here</b>").addTo(mymap);

            // Make Zomato API call and get the restaurants' coordinates
            getRestaurant(lat, lon);
        });
    }
    
}

/*
 * Function: to make API call and get the object
 */
function getRestaurant(lat, lon) {

    queryParams.lat = lat;
    queryParams.lon = lon;
    queryParams.apikey = "b32c2c14b4902cce45a0bb7619606d1d";

    //Get response from Zomato
    $.ajax({
        url: queryURL + $.param(queryParams),
        method: "GET"
      }).then(function(response) {

        var nearbyRest = response.nearby_restaurants;
        var markers = [];
        for (var i=0; i<nearbyRest.length; i++) {
        
            // Compose the marker with restaurant details
            var marker = {};
            marker["lat"] = nearbyRest[i].restaurant.location.latitude;
            marker["lon"] = nearbyRest[i].restaurant.location.longitude;
            marker["name"] = nearbyRest[i].restaurant.name;
            marker["address"] = nearbyRest[i].restaurant.location.address;
            marker["cuisines"] = nearbyRest[i].restaurant.cuisines;
            marker["url"] = nearbyRest[i].restaurant.url;

            // Add the marker to the markers array
            markers.push(marker);
        }

        // Add the markers to the map
        addMarkers(markers);
    });
}

/*
 * Function: to add markers to the map
 */
function addMarkers(markers) {

    // Add the markers
    for(var i=0; i<markers.length; i++) {
    
        L.marker([markers[i].lat, markers[i].lon]).addTo(mymap)
            .bindPopup("<b>" + markers[i].name + "</b><br />" + markers[i].address + "<br />" + markers[i].cuisines + "<br /><a target='_blank' href='" + markers[i].url + "'>Details</a>");
    }
}

$(document).ready(function() {
    
    $("#rest-btn").on("click", function() {
        event.preventDefault();
        
        // If the map exists already, remove it, then add a new map 
        if ($("#map").length)
            $("#map").remove();
        $("#map-div").append('<div id="map">');

        $("#map").attr("style", "height:350px");

        displayMap();
    });
   
});