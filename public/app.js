let map;
let marker;

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
      limit: 20
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
  const results = data.businesses.map((item, index) =>
    renderQueryResults(item)
  );
  initMap(data);
  data.businesses.forEach((business) =>
    createMarker(business));

  $(".results-data").html(results);
  $(".page-1").addClass("hidden");
  $(".page-2").removeClass("hidden");
}

//function to render the data results to HTML
function renderQueryResults(results) {
  let starRating = createStarRating(results.rating);
  //console.log("My starRating is", starRating);
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
    <span class="business business-stars">${starRating}</span>
    <a class="business business-review-qty">${results.review_count} reviews</a>
    <button role="button" type="button" class="airbnb-button" value="${results.location.city}--${results.location.state}-${results.location.zip_code}">Find Airbnb's Nearby</button>
  </div>
</div>`;
}
//<img class="business business-rating-stars" onload="this.onload=null; this.src=createStarRating(${results.rating});" src="" alt="rating stars"/>

// takes the rating and rounds it down, then determines if there is a halfstar, then fills stars using a fontawesome CDN
function createStarRating(rating) {
  let fullStars = Math.floor(rating);
  let halfStars = (rating % 1 < 1 && rating % 1 > 0) ? 1 : 0;
  let emptyStars = 5 - (fullStars + halfStars);
  output = '<i class="fa fa-star" style="color: gold;"></i>'.repeat(fullStars);
  output += '<i class="fa fa-star-half-o" style="color: gold;"></i>'.repeat(halfStars);
  output += '<i class="fa fa-star-o" style="color: gold;"></i>'.repeat(emptyStars);
  return output;
}
//return output + '</div>';


//google API required constructor function to create map object and center it
function initMap(data) {
  let lat = data.region.center.latitude;
  let lng = data.region.center.longitude;
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 10,
    draggable: true,
    zoomControl: true,
    scrollWheel: false,
    gestureHandling: "greedy"
  });
}

//google API constructor for making map markers
function createMarker(business) {
  marker = new google.maps.Marker({
    position: {
      lat: business.coordinates.latitude,
      lng: business.coordinates.longitude
    },
    map: map,
    title: business.name,
    //content: createMapDetailBox(business)
  });
}

//Creates box on map with business info
function createMapDetailBox(businesses) {
  let starRating = createStarRating(results.rating);
  console.log("createMapDetailBox is running");
    return `
    <div class="results-data-card" id="repeat">
    <div class="business-img-container">
    <img class="business-img" src="${businesses.image_url}" alt="${businesses.name}"/>
    </div>
    <div class="business-list-details">
    <p class="business business-name">${businesses.name}</p>
    <p class="business business-desc">${businesses.location.address1}</p>
    <p class="business business-phone">${businesses.display_phone}</p>
    <span class="business business-rating-qty">${businesses.rating}</span>
    <span class="business business-stars">${starRating}"></span>
    <a class="business business-review-qty">${businesses.review_count} reviews</a>
    <button role="button" type="button" class="airbnb-button" "value="${businesses.location.city}--${businesses.location.state}-${businesses.location.zip_code}">Find Airbnb's Nearby</button>
    </div>
    </div>`
}

//creates
//function markerActions(){
// marker.addListener('click', function() {
//   need to render it somewhere..where?
// })
// marker.addListener('mouseover', function() {
//  shows the box
//  })
// marker.addListener('mouseout', function() {
//  hides the box
//})
//}



//displays either the map or the results data depending on which arrow is clicked
function arrowButtonListeners() {
  $('#map-arrow').click(function() {
    $('.results-container').slideUp();
    $('#left-arrow').removeClass('hidden');
  });

  $('#left-arrow').click(function() {
    $('.results-container').slideToggle('slow');
    $('#left-arrow').addClass('hidden');
  });
}

//takes you to airbnb site with search results based on location
function findAirbnbs() {
  $('.results-data').on('click', '.airbnb-button', function(event) {
  event.preventDefault;
  let searchLoc = $(this).attr("value");
  console.log("Im the clicked location", searchLoc);
  window.open(`https://www.airbnb.com/s/${searchLoc}/homes`);
 });
}

//document ready functions for Jquery
$(function() {
  watchSearchButton();
  arrowButtonListeners();
  findAirbnbs();
  //markerActions();
});
