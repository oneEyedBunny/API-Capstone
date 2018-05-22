//creates request object and response
funtion getDataFromYelp(searchTerm, callback) {
  const query = {
    url: " ",
    data: {
      q: '',
      maxResults: 10,
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    // error: function(error) {console.log(error)},
    // key: " ",
  };
  $.ajax(query)
}

//function to render the results to HTML
function renderQueryResults(results) {

}

//function to place data on page
function displaySearchData(data) {
  // renderQueryResults();
}

//
function watchSearchButton(){
  $('').click(function(event) {
    event.preventDefault();
    // const queryTarget = $(event.currentTarget).find();
    // const query = queryTarget.val();


    getDataFromYelp(query, displaySearchData);
  })
}

//document ready
$(watchSearchButton);

//google API required constructor function to create map object and center it
let map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 10
});
