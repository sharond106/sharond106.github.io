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

/** Javascript functions for getting, posting, and deleting comments */

// Create GET request to /comment servlet
function getServerData() {
  console.log("Fetching data.");

  // Get user's values from the html document
  const maxElement = document.getElementById("quantity");
  const maxToDisplay = maxElement.value;
  const sort = document.getElementById("sort").value;
  const imgsrc = document.getElementById("modal-img").src;

  // Don't get comments if the image has no value
  if (!imgsrc) {
    console.log("null image src");
    return;
  }
  const img = getImgName(imgsrc);
  if (img == "") {
    console.log("invalid img src");
    return;
  }

  fetch("/comment?quantity=" + maxToDisplay + "&sort=" + sort + "&img=" + img).then(response => response.json()).then(jsonObj => {
    const comments = jsonObj.comments;
    const total = jsonObj.total;

    // Display the total number of comments to user
    const totalElement = document.getElementById("total");
    totalElement.innerText = ("Comments (" + total + ")");

    // Make sure user can't try to display more than the total number of comments
    maxElement.max = total.toString();
    maxElement.placeholder = total.toString();

    // Add individual comments to html page
    const list = document.getElementById("all-comments");
    list.innerHTML = "";
    comments.forEach((comment) => {
      const listElement = document.createElement("li");

      // Display name, date, and comment
      const textElement = document.createElement("span");
      const date = new Date(comment.timestamp);
      textElement.innerHTML = "<b>" + comment.name + "</b>    <small>" + date.toLocaleString() + "</small><br><br>" + comment.comment;

      // Display a delete button
      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.className = "delete-button";
      deleteButtonElement.innerText = "Delete";
      deleteButtonElement.addEventListener("click", () => {
        console.log("Delete button clicked");
        deleteComment(comment);
      });

      listElement.appendChild(textElement);
      listElement.appendChild(deleteButtonElement);
      list.append(listElement);
    });
  });
}

// Create POST request to /delete servlet to delete comment, called by delete button onclick
function deleteComment(comment) {
  console.log("Deleting comment");

  const params = new URLSearchParams();
  params.append("id", comment.id);
  const postRequest = new Request("/delete", {
    method: "POST",
    body: params
  });
  fetch(postRequest).then(() => getServerData()).catch(error => console.error(error));
}

// Create POST request to /comment servlet
function postComment() {
  console.log("Posting comment");

  // Get user's values 
  const nameElement = document.getElementById("name");
  const commentElement = document.getElementById("comment-box");
  const imgsrc = document.getElementById("modal-img").src;

  // Don't create comment if the comment is empty or the image has no src
  if (!commentElement.value) {
    alert("Comment cannot be empty");
    return;
  }

  const img = getImgName(imgsrc);
  if (img == "") {
    console.log("invalid img src");
    return;
  }

  const params = new URLSearchParams();
  params.append("name", nameElement.value);
  params.append("comment", commentElement.value);
  params.append("img", img);
  const postRequest = new Request("/comment", {
    method: "POST",
    body: params
  });

  // Reset textboxes 
  nameElement.value = "";
  commentElement.value = "";

  fetch(postRequest).then(() => getServerData()).catch(error => console.error(error));
}

// Extracts image name from the src
function getImgName(imgsrc) {
  console.log("Getting image name");
  const splitimg = imgsrc.split("/");

  // Get image file name in img tag's src field (ex: flowers.jpg)
  if (splitimg.length == 0) {
    return "";
  }
  const splitname = splitimg[splitimg.length - 1].split(".");

  // Get string before file format string (remove .jpg)
  if (splitname.length > 0) {
    return splitname[0];
  }
  return "";
}
