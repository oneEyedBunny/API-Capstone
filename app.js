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
