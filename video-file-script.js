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


/** Javascript functions for handling the video file and the show/ hide video button*/

// Video file path
var path = "";

// Updates video being shown to match the file input (updates when user changes file)
const file = document.getElementById("video-file");
if (file) {
  file.addEventListener("change", (event) => {
    if (document.forms["upload-video"]["video-file"].value == "") {
      // If the file becomes empty (user hits cancel when selecting) hide the video and the button to "Show Video"    
      hideVideo();
      document.getElementById("show-hide-video").style.display = "none";
    } else {
      // If a new file is selected, update the HTML video element's src
      showVideo();
      document.getElementById("show-hide-video").style.display = "inline-block";
    }
  });
}

// Hides the video from the webpage
function hideVideo() {
  const video = document.getElementById("video");
  video.style.display = "none";
  // Toggle button to allow user to show video
  const showHideButton = document.getElementById("show-hide-video");
  showHideButton.onclick = showVideo;
  showHideButton.innerText = "Show Video";
  if (submitted) {
    document.getElementById("camera-button").style.display = "none";
  }
}

// Displays the video to the webpage
function showVideo() {
  const video = document.getElementById("video");
  video.src = URL.createObjectURL(document.querySelector("#video-file").files[0]);
  video.style.display = "inline-block";
  // Toggle button to allow user to hide video
  const showHideButton = document.getElementById("show-hide-video");
  showHideButton.onclick = hideVideo;
  showHideButton.innerText = "Hide Video";
  if (submitted) {
    document.getElementById("camera-button").style.display = "inline-block";
  }
}

/** 
 * Saves the file path, or alerts the user that a file needs to be selected
 * 
 * @return {boolean}: Returns true if a file was selected, false otherwise
 */
function saveFile() {
  if (document.getElementById("video-file").value) { 
    path = URL.createObjectURL(document.querySelector("#video-file").files[0]);
    return true;
  } else {
    alert("Please select a file.");
    return false;
  } 
}
