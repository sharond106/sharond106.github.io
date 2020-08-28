<%--
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--%>

<%-- The Java code in this JSP file runs on the server when the user navigates
     to this page. --%>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/upload"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upload</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Work Sans" rel="stylesheet"> 
    <script src="upload_script.js"></script>
  </head>
  <body onload="showFiles()">
    <div class="topnav">
      <div class="topnav-left">
        <a href="index.html">Sharon Dong</a>
      </div>
      <a href="index.html#contact">Contact</a>
      <a href="pics.html">Fun Photos</a>
      <a href="projects.html">Projects</a>
      <a href="index.html#about-me">About</a>
      <a href="upload.jsp">Upload Image</a>
    </div>
    <div id="pad">
      <h1>Upload an image</h1>
      <form method="POST" enctype="multipart/form-data" action="<%= uploadUrl %>">
        <input type="file" name="image">
        <br><br>
        <textarea name="message" placeholder="Caption"></textarea>
        <br><br>
        <button>Submit</button>
      </form>
      <p id="error">${error}</p>
      <ul id="uploads"></ul>
    </div>
  </body>
</html>