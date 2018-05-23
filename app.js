for (var i = 0; i < 10; i++) {
  $(".results-data").append($("#repeat").clone());
}
let map;

// //creates request object and response for Yelp
// funtion getDataFromYelp(searchTerm, callback) {
//   const query = {
//     url: " ",
//     data: {
//       q: '',
//       maxResults: 10,
//     },
//     dataType: 'json',
//     type: 'GET',
//     success: callback,
//     // error: function(error) {console.log(error)},
//     // key: " ",
//   };
//   $.ajax(query)
// }
//
// //function to render the results to HTML
// function renderQueryResults(results) {
//
// }
//
// //function to place data on page
// function displaySearchData(data) {
//   // renderQueryResults();
// }
//
// //function to make the call to Yelp once the search button has been clicked
// function watchSearchButton(){
//   $('').click(function(event) {
//     event.preventDefault();
//     // const queryTarget = $(event.currentTarget).find();
//     // const query = queryTarget.val();
//
//
//     getDataFromYelp(query, displaySearchData);
//   })
// }
//
// //document ready function
// $(watchSearchButton);
// $(initmap); //make sure to remove it from body tag
//
// //Obtains the latitude and longitude coordinates for the initMap()
//function getLocationCoordinates() {
//
//
//}
//
// //google API required constructor function to create map object and center it
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644},
    zoom: 10,
    draggable: true,
    zoomControl: true,
    scrollWheel: false,
    gestureHandling: 'greedy'
  });

  // let image='logo.png';
  // let marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   icon:image
  // });
}

// google.maps.event.addDomListner(window, 'load', initMap);
