// from data.js, set a variable object
var tableData = data;

// getting a reference to each input element with class 'form-control'
var inputDateText = d3.select("#datetime");
var inputCityText = d3.select("#city");
var inputStateText = d3.select("#state");
var inputCountryText = d3.select("#country");
var inputShapeText = d3.select("#shape");

// getting a reference for the button
var $button = d3.select("#filter-btn");


////////////////////////
//// Function to grab data by specified filters
////////////////////////
function filterData(event) {
  // make a deep copy of tableData
  let filteredData = JSON.parse(JSON.stringify(tableData));

  // stops the page refresh on "Enter" button
  d3.event.preventDefault();

  // grabbing the text/value associated with the inputs
  var inputDate = inputDateText.property("value");
  var inputCity = inputCityText.property("value");
  var inputState = inputStateText.property("value");
  var inputCountry = inputCountryText.property("value");
  var inputShape = inputShapeText.property("value");

  // create a search parameters object
  var filters = {};
  // input text data into filters object
  (inputDate ? filters.datetime = inputDate : null);
  (inputCity ? filters.city = inputCity : null);
  (inputState ? filters.state = inputState : null);
  (inputCountry ? filters.country = inputCountry : null);
  (inputShape ? filters.shape = inputShape : null);

  // create a keys object to relate filters parameters to filteredData object
  var keys = Object.keys(filters);

  // Loop through keys to filter through filteredData
  for ( i=0; i<keys.length; i++) {
    // filter out filteredData
    filteredData = filteredData.filter(row => (
      row[keys[i]] == filters[keys[i]]
      ));
  };

  return filteredData;
};


/////////////////////
////  Function to populate filtered data
/////////////////////
function populateTable(event) {
  // use helper function to grabbed date data
  data = filterData();
  console.log(data);
  // clear out all tbody html values
  $tbody = d3.select("#filtered-data");
  $tbody.html("");

  // Loop through each date, create tr & tds
  if (data.length>0) {
    data.forEach(row => {
        // // create a tr
        var $tr = $tbody.append("tr");

        //create td for each value
        $tr.append("td").text(row.datetime);
        $tr.append("td").text(row.city);
        $tr.append("td").text(row.state);
        $tr.append("td").text(row.country);
        $tr.append("td").text(row.shape);
        $tr.append("td").text(row.durationMinutes);
        $tr.append("td").text(row.comments);
      });
  }
  else {
    var $tr = $tbody.append("tr");
    $tr.append("td").text("No results for query.");
  };
};


//////////////////////
//// Attach an event to detect button click
//////////////////////
$button.on("click", populateTable);
