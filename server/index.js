var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//Pick one of the two route options below:
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************

//Routes
const movieRoutes = require("./routes/movieRoutes.js");

//Use routes
app.use("/movies", movieRoutes);

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
