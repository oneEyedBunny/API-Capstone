var path = require("path");
var express = require("express");
var cors = require("cors");
var axios = require("axios");
const yelp = require("yelp-fusion");

var KEY =
  "Deo8e9rL-9CU0oDhQDVWUYabFzOr_-5P3Zn9uT4qbMOwhT8Ojmk2Dd3gUYTodekMv9laxFylRlKW0SW0BcPix3vdticOH9dOuhRC4fQPCDyrq5mKm9KqFRddgN8GW3Yx";

const client = yelp.client(KEY);

var app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// http://localhost:3000/asd?latitude=40.712775&longitude=-74.005973
app.get("/yelp", function(req, res) {
  console.log(req.query);
  console.log(req.params);
  client
    .search({
      location: req.query.location,
      categories: req.query.categories
    })
    .then(response => {
      console.log(response.jsonBody);
      res.send(response.jsonBody);
    })
    .catch(e => {
      console.log(e);
    });
});

var staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

app.listen(3000, function() {
  console.log("listening");
});
