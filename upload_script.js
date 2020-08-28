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

/** Javascript function for displaying uploaded files */

function showFiles() {
  console.log("showing files");
  fetch("/upload").then(response => response.json()).then(files => {
    // Add individual files to html page
    const list = document.getElementById("uploads");
    list.innerHTML = "";
    files.forEach((file) => { 
      const listElement = document.createElement("li");

      // Display image
      const imgContainer = document.createElement("div");
      imgContainer.id = "uploadImage";
      const imgElement = document.createElement("img");
      imgElement.src = file.url;
      imgContainer.appendChild(imgElement);

      // Display caption and date
      const textElement = document.createElement("span");
      const date = new Date(file.timestamp);
      textElement.innerHTML = "<b><b>" + file.caption + "</b><small>    " + date.toLocaleString() + "</small><br><br>";

      listElement.appendChild(imgContainer);
      listElement.appendChild(textElement);
      list.append(listElement);
    });
  });
}