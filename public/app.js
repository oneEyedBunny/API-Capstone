// Makes the call to Yelp once the search button has been clicked, resets the query values to empty
function watchSearchButton() {
  $(".search-form").submit(function(event) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget);
    let queryValue = queryTarget.find(".search-data").val();
    let queryLocation = queryTarget.find(".search-loc").val();
    getDataFromYelp(queryValue, queryLocation, displaySearchData);
    queryValue = "";
    queryLocation = "";
  });
}

//request object for Yelp
function getDataFromYelp(term, location, callback) {
  const settings = {
    url: "/yelp",
    data: {
      location: location,
      term: term,
      limit: 10
    },
    dataType: "json",
    type: "GET",
    success: callback,
    error: function(error) {
      console.log(error);
    }
  };
  $.ajax(settings);
}

// Callback function that loops through each object in the yelp array & places it on page2
function displaySearchData(data) {
  console.log("my yelp data is:", data);
  console.log("my lat/lng is", data.region.center);//verifying that lat/lng is here
  const results = data.businesses.map((item, index) =>
    renderQueryResults(item)
  );
  data.businesses.forEach((business) =>
    createMarker(business));

  initMap(data);
  $(".results-data").html(results);
  $(".page-1").addClass("hidden");
  $(".page-2").removeClass("hidden");
}

//function to render the data results to HTML
function renderQueryResults(results) {
  return `
<div class="results-data-card" id="repeat">
  <div class="business-img-container">
    <img class="business-img" src="${results.image_url}" alt="${results.name}"/>
  </div>
  <div class="business-list-details">
    <p class="business business-name">${results.name}</p>
    <p class="business business-desc">${results.location.address1}</p>
    <p class="business business-phone">${results.display_phone}</p>
    <span class="business business-rating-qty">${results.rating}</span>
    <span class="business business-rating-stars" onload="createStarRating(${
      results.rating
    });"></span>
    <a class="business business-review-qty">${results.review_count} reviews</a>
    <button role="button" type="button" class="airbnb-button" value="${results.location.city}--${results.location.state}-${results.location.zip_code}">Find Airbnb's Nearby</button>
  </div>
</div>`;
}
//<img class="business business-rating-stars" onload="this.onload=null; this.src=createStarRating(${results.rating});" src="" alt="rating stars"/>

// takes the rating and rounds it to the nearest half, then fills whole stars and half stars and empty stars using a fontawesome CDN
function createStarRating(rating) {
  let roundedRating = Math.round(rating * 2) / 2;
  let yellowStars = roundedRating;
  let whiteStars = 5 - roundedRating;
  console.log(yellowStars);
  console.log(whiteStars);

  output = '<div title="' + rating + '">';
  output += '<i class="fa fa-star" style="color: gold;">'.repeat(yellowStars);
  output += '<i class="fa fa-star-half-o" style="color: gold;">'.repeat(
    whiteStars
  );
  output += '<i class="fa fa-star-o" style="color: gold;">'.repeat(whiteStars);
  //return output + '</div>';
  $(".business-rating-stars").text = output;
}

let map;
let marker;

//google API required constructor function to create map object and center it
function initMap(data) {
  let lat = data.region.center.latitude;
  let lng = data.region.center.longitude;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 10, //15 is street level
    draggable: true,
    zoomControl: true,
    scrollWheel: false,
    gestureHandling: "greedy"
  });
}

//google API constructor for making map markers
function createMarker(business) {
  // console.log(business);
  // console.log(business.coordinates);
  marker = new google.maps.Marker({
    position: {
      lat: business.coordinates.latitude,
      lng: business.coordinates.longitude
    },
    map: map,
    title: business.name,
    content: createMapDetailBox(business)
  });
  console.log("My marker function ran");
}

//Creates box on map with business info
function createMapDetailBox(businesses) {
  //console.log("createMapDetailBox is running");
// return `
// <div class="results-data-card" id="repeat">
//  <div class="business-img-container">
//    <img class="business-img" src="${businesses.image_url}" alt="${businesses.name}"/>
//  </div>
//  <div class="business-list-details">
//    <p class="business business-name">${businesses.name}</p>
//    <p class="business business-desc">${businesses.location.address1}</p>
//    <p class="business business-phone">${businesses.display_phone}</p>
//    <span class="business business-rating-qty">${businesses.rating}</span>
//    <span class="business business-rating-stars" onload="createStarRating(${businesses.rating});"></span>
//    <a class="business business-review-qty">${businesses.review_count} reviews</a>
//    <button role="button" type="button" class="airbnb-button" "value="${businesses.location.city}--${businesses.location.state}-${businesses.location.zip_code}">Find Airbnb's Nearby</button>
//  </div>
// </div>`
}

//displays either the map or the results data depending on which arrow is clicked
function arrowButtonListeners() {
  $("#map-arrow").click(function() {
    $(".results-container").slideUp();
    $("#left-arrow").removeClass("hidden");
  });

  $("#left-arrow").click(function() {
    $(".results-container").slideToggle("slow");
    $("#left-arrow").addClass("hidden");
  });
}

//takes you to airbnb site with search results based on location
function findAirbnbs() {
  console.log("NOT clicked");
  $('.airbnb-button').on("click", function(event) {
  event.preventDefault;
  console.log("Clicked");
  // let target = event.currentTarget;
  // let searchLoc = target.val()
  // console.log(target);
  // console.log("Im the clicked location", searchLoc);
 //  window.open(`https://www.airbnb.com/s/${searchLoc}/homes`);
 });
}

//document ready functions for Jquery
$(function() {
  watchSearchButton();
  arrowButtonListeners();
  findAirbnbs();
});
