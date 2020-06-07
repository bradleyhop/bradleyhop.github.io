function getResults(apiUrl) {
  return $.ajax({
    url: apiUrl,
    type: 'GET',
    dataType: 'json'
  })
    .always(function() {
      // clear prior search results
      $(".results").empty();
    })
    .fail(function() {
      const failure =
        `<div class='noResults'>
           <h2>
             Failed retrieving a response from wikipedia api!!!
           </h2>
         </div>`;
      $(".results").append(failure);
    });
}

// given the json object, which is mostly empty, display a helpful
//  dialogue saying no page exists and linking to make a request
function noResults(results) {
  const emptyResult =
    `<div class='noResults'>
       <h2>
         The page ${results[0]} does not exist. You can
         <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation"
          target="_blank" rel="noopener">
          ask for it to be created.
         </a>
       </h2>
     </div>`;
  $(".results").append(emptyResult);
}


// given the json object, display title and description with the link to
//  the article
function displayResults(results) {
  // first result is usually what we're looking for,
  //  so lets give it special attention
  const mainResult =
    `<a href="${results[3][0]}" target="_blank" rel="noopener">
       <div class="mainSearchResult btn btn-block boxes">
         <h2>
           ${results[1][0]}
         </h2>
         ${results[2][0]}
       </div>
     </a>`;
  $(".results").append(mainResult);

  // secondary results, if any
  for (let i = 1; i < results[1].length; i++) {
    let secResult =
      `<a href="${results[3][i]}" target="_blank" rel="noopener">
         <div class="altResults btn btn-block boxes">
           <h3>
             ${results[1][i]}
           </h3>`;
    if (results[2][i] === "") {
      // no description in json, but article exists; close tags
      secResult +=
              `No description given. Click for article.
            </div>
          </a>`;
    } else {
      // give description and close tags
      secResult +=
           `${results[2][i]}
          </div>
        </a>`;
    }
    $(".results").append(secResult);
  }
}


$(document).ready(function() {
  // get the search term from the user on enter or button press
  $(".searchButton").click(function() {
    const userQuery = $(".searchWiki").val();
    const endPointURL =
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${userQuery}&format=json&origin=*`;
    getResults(endPointURL).done(function(data) {
      // do the success stuff here
      if (data[1].length === 0) {
        noResults(data);
      } else {
        displayResults(data);
      }
    });
  });
  // search if enter or button pressed
  $(".searchWiki").keypress(function(e) {
    if (e.which === 13) {
      $(".searchButton").click();
    }
  });
});
