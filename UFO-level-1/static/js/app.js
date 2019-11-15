// from data.js, set a variable object
var tableData = data;

// getting a reference to the input element with class 'form-control'
var inputText = d3.select("#datetime");
// getting a reference for the button
var $button = d3.select("#filter-btn");


////////////////////////
//// Function to grab data by specified date
////////////////////////
function filterDate(event) {

  // stops the page refresh on "Enter" button
  d3.event.preventDefault();

  // grabbing the text/value associated with the element
  var inputDate = inputText.property("value");

  // use filter to grab objects associated by inputDate
  var dateData = tableData.filter( date => date.datetime == inputDate);
  return dateData;

};


/////////////////////
////  Function to populate dateData
/////////////////////
function populateTable(event) {
  // use helper function to grabbed date data
  data = filterDate();

  // clear out all tbody html values
  $tbody = d3.select("#datedata");
  $tbody.html("");

  // Loop through each date, create tr & tds
  data.forEach(date => {
      // // create a tr
      var $tr = $tbody.append("tr");

      //create td for each value
      $tr.append("td").text(date.datetime);
      $tr.append("td").text(date.city);
      $tr.append("td").text(date.state);
      $tr.append("td").text(date.country);
      $tr.append("td").text(date.shape);
      $tr.append("td").text(date.durationMinutes);
      $tr.append("td").text(date.comments);
    });
};


//////////////////////
//// Attach an event to detect changes in input field
//////////////////////
d3.select("form").on("submit", filterDate);

//////////////////////
//// Attach an event to detect button click
//////////////////////
$button.on("click", populateTable);
