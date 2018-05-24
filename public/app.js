var KEY =
  "Deo8e9rL-9CU0oDhQDVWUYabFzOr_-5P3Zn9uT4qbMOwhT8Ojmk2Dd3gUYTodekMv9laxFylRlKW0SW0BcPix3vdticOH9dOuhRC4fQPCDyrq5mKm9KqFRddgN8GW3Yx";

for (var i = 0; i < 10; i++) {
  $(".results-data").append($("#repeat").clone());
}
let map;

// //creates request object and response for Yelp
function getDataFromYelp(searchTerm, location, callback) {
  const querySettings = {
    url: "https://api.yelp.com/v3/businesses/search",
    data: {
      term: searchTerm,
      location: location
      //limit: 10
    },
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", "Bearer " + KEY);
    },

    //dataType: "json",
    // type: "GET",
    dataType: "jsonp",
    jsonpCallback: "cb",
    async: false,
    cache: true
    // success: function(data) {
    //   console.log(data);
    //   callback();
    // },
    // error: function(error) {
    //   console.log(error);
    // }
  };
  $.ajax(querySettings);
}
function cb() {
  console.log("asd");
}
//
// //function to render the results to HTML
// function renderQueryResults(results) {
//
// <div class="results-data-card" id="repeat">
//   <div class="business-img-container">
//     <img class="business-img" src="${business.image_url}" alt="${business.name}"/>
//   </div>
//   <div class="business-list-details">
//     <p class="business business-name">${business.name}</p>
//     <p class="business business-desc">${business.alias}</p>
//     <img class="business business-rating-img" src="${business.rating}" alt="rating stars"/>
//     <a class="business business-review-qty">${business.review_count}</a>
//     <a class="business business-more">more...</a>
//     <button role="button" type="submit" class="airbnb-button" value="">Find Airbnb's Nearby</button>
//   </div>
// </div>
//
// }
//
// //function to place data on page
function displaySearchData(data) {
  // renderQueryResults();
  // will change the class on Page-1 to hidden and remove that same class from Page-2
}
//
// //function to make the call to Yelp once the search button has been clicked
function watchSearchButton() {
  $(".search-form").submit(function(event) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget);
    let queryValue = queryTarget.find(".search-data").val();
    let queryLocation = queryTarget.find(".search-loc").val();
    console.log(event);
    console.log(queryValue, queryLocation);
    getDataFromYelp(queryValue, queryLocation, displaySearchData);
    //  queryValue = "";
    //  queryLocation = "";
  });
}
//
// //document ready function
$(watchSearchButton);
// $(initmap); //make sure to remove it from body tag
//
// //Obtains the latitude and longitude coordinates for the initMap()
//function getLocationCoordinates() {
//
//}
//
// //displays either the map or the results data depending on which arrow is clicked
// function clickArrow() {
//   when the user clicks the right arrow, the listing results will have their class set to hidden
//   and the map will have it's class of hidden removed
// }
//
// //google API required constructor function to create map object and center it
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10,
    draggable: true,
    zoomControl: true,
    scrollWheel: false,
    gestureHandling: "greedy"
  });

  // let image='logo.png';
  // let marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   icon:image
  // });
}

// google.maps.event.addDomListner(window, 'load', initMap);
