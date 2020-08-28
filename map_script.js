// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** Javascript functions for displaying the map and its features */

// Create the script tag for map api and set the appropriate attributes
var mapscript = document.createElement("script");
mapscript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAy6bZSEG3FN2VdsI8vRcnyew6kt6BTsCg&callback=initMap";
mapscript.defer = true;
mapscript.async = true;

// Global variable that stores map (used in script.js)
var globalMap;

// Attach callback function to display map to the `window` object
window.initMap = function () {
  // Default map is centered at the middle of the Atlantic Ocean and zoomed to display the US and half of Europe
  var centeredLat = 39;
  var centeredLng = -39;
  var defaultZoom = 3;
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: centeredLat,
      lng: centeredLng
    },
    zoom: defaultZoom,
    styles: style   // style object loaded from map_style.js
  });
  globalMap = map;
  // Get location data from server
  showLocations(map);
};

// Create GET request to /location servlet for map data
function showLocations(map) {
  fetch("/location").then(response => response.json()).then(locations => {
    locations.forEach(location => {
      createMarker(map, location);
    });
  });
}

// Array of all [location.name, marker] pairs on the map
var markers = [];

// Create marker icon for location parameter on map
function createMarker(map, location) {
  // Create marker at the location's latitude and longitude
  var marker = new google.maps.Marker({
    position: {
      lat: location.latitude,
      lng: location.longitude
    },
    map: map
  });
  
  // Create infowindow for marker
  const infowindowNode = createInfowindowNode(location);
  marker.infowindow = new google.maps.InfoWindow({
    content: infowindowNode
  });
  
  // Add marker to markers array
  const locationMarker = [location.name, marker];
  markers.push(locationMarker);

  // Create a bounce animation for 2 seconds, and show info window when marker is clicked on
  marker.addListener("click", function () {
    // Close all other markers
    markers.forEach(function (locationMarker) {
      locationMarker[1].infowindow.close();
    });
    
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.infowindow.open(map, marker);
    var animationDuration = 2000; // in milliseconds
    window.setTimeout(function () {
      marker.setAnimation(null)
    }, animationDuration);
  });
}

// Create infowindow with text and filter button for location parameter
function createInfowindowNode(location) {
  const infowindowNode = document.createElement("span");
  infowindowNode.innerHTML = "<div id=\"place\"><p>" + location.name + "</p><small>" + location.description + "</small></div>";

  // Create button to filter images by location.name
  const filterButton = document.createElement("button");
  filterButton.innerText = "Filter images";
  filterButton.id = "filter-button";
  filterButton.addEventListener("click", () => {
    console.log("Filter button clicked");
    filter(location.name);
  });

  infowindowNode.append(filterButton);
  return infowindowNode;
}

// Displays images stored in filter_pics.html at parameter location
function filter(location) {
  console.log("filtering: " + location);
  $("#images").load("filter_pics.html #" + location);
}

// Append the "mapscript" element to "head"
document.head.appendChild(mapscript);