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

app.get("/yelp", function(req, res) {
  console.log('asdfasdfdas');
  console.log(req.query);
  console.log(req.params);
  client
    .search({
      location: req.query.location,
      term: req.query.term,
      limit: 50
    })
    .then(response => {
      console.log(response.jsonBody);
      res.send(response.jsonBody);
    })
    .catch(e => {
      console.log("hi", e.response.body);
      res.status(400).send(e.response.body.error);
      console.log(e);
    });
});

var staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
