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

/** Javascript functions for scrolling and showing image modal */

// Scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0;
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  const button = document.getElementById("to-top-btn");
  if (window.pageYOffset > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

// When the user clicks a photo, show image in modal
function showModal(img) {
  const modal = document.getElementById("my-modal");
  const mapButton = document.getElementById("go-to-map");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("caption");
  
  // If img does not have a location, don't display "See on map" button
  if (!img.name) {
    mapButton.style.display = "none";
  } 
  // Else set event listener
  else {
    mapButton.style.display = "block";
    addMapButtonEvent(mapButton, img);
  }

  modal.style.display = "block";
  modalImg.src = img.src;
  modalCaption.innerHTML = img.alt + "  " +
    "<button onclick=\"window.location.href='#comments-container';\" id=\"to-comments\" name=\"to-comments\"><small>See comments.</small></button>";
  getServerData();
}

function closeModal() {
  const modal = document.getElementById("my-modal");
  modal.style.display = "none";
  const maxElement = document.getElementById("quantity");
  maxElement.value = "";
}

// Add event listener for mapButton on img
function addMapButtonEvent(mapButton, img) {
  mapButton.addEventListener("click", () => {
    // Search for correct marker by location in markers array (declared in map_script.js) and show infowindow
    markers.forEach(function (locationMarker) {
      if (locationMarker[0] === img.name) {
        locationMarker[1].infowindow.open(globalMap, locationMarker[1]);
        window.location.href = "#map";
        closeModal();
        return;
      } else { 
        locationMarker[1].infowindow.close();
      }
    });
  });
}