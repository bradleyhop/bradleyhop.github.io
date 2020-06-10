function getResults(query) {
  let url = "https://en.wikipedia.org/w/api.php";

  let params = {
    action: 'query',
    format: 'json',
    formatversion: 2, // give the pages in an array
    // extracts are the first lines of an article
    // description is the internal description of the article
    prop: 'extracts|description',
    generator: 'search',
    exlimit: 'max', // to avoid exlimit errors
    gsrlimit: '10', // number of articles to return
    exintro: 1, // needed to get extract
    exsentences: 3, // max number of extract chars to return with elepsis
    explaintext: 1, // no html, please`
    excontinue: 1, // needed to get all articles
    exsectionformat: 'plain', // no html, please
    gsrsearch: query, // needed for additional data to be returned
  };

  url = url + '?origin=*'; // for CORS
  Object.keys(params).forEach((key) => { url += `&${key}=${params[key]}`; });

  fetch(url)
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.query === undefined) {
        // wikimedia returned no results
        noResults(params.gsrsearch);
      } else {
        // wikimedia returns data
        displayResults(response.query.pages);
      }
    })
    .catch((error) => {
      const fail =
        `<div class='noResults'>
           <h2>
             Failed retrieving a response from wikipedia api!!!\n${error}
           </h2>
         </div>`;
      $(".results").append(fail);
    });
}

// given the json object, which is mostly empty, display a helpful
//  dialogue saying no page exists and linking to make a request
function noResults(searchTerm) {
  const emptyResult =
    `<div class='noResults'>
       <h2>
         The page "${searchTerm}" does not exist. You can
         <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation"
          target="_blank" rel="noopener" aria-label="create wikipedia article">
          ask for it to be created.
         </a>
       </h2>
     </div>`;
  $(".results").append(emptyResult);
}


// given the json object, display title and description with the link to
//  the article
function displayResults(results) {
  // returned array is unsorted but gives us an index in the objects
  results.sort((a,b) => a.index - b.index);

  for (let i in results) {
    let resultBox =
      `<a href="https://en.wikipedia.org/wiki/${results[i].title.replace(/\s/g, '_')}"
          target="_blank" rel="noopener" aria-label="${results[i].title}">`;

    // style the first returned item as it's probably the most relevant to the user
    if (i == 0) {
      resultBox +=  `<div class="mainSearchResult boxes" title="go to wikipedia article">`;
    } else {
      resultBox += `<div class="altResults boxes" title="go to wikipedia article">`;
    }

    resultBox +=
      `<h2 class="heading">
         ${results[i].title}
       </h2>
       <div class="articleDescription">
         <i>${results[i].description}</i>
       </div>`;

    // not every title has an extract from the article
    if (results[i].extract) {
      resultBox += `<p class="extract">${results[i].extract}</p>`;
    }

    resultBox +=
      `</div>
    </a>`;

    $('.results').append(resultBox);
  }
}


$(document).ready(() => {
  // get the search term from the user on enter or button press
  $(".searchButton").click(function() {
    const userQuery = $(".searchWiki").val();
    // clear prior results
    $('.results').empty();

    // fetch results from wikimedia api
    getResults(userQuery);
  });

  // search if enter or button pressed
  $(".searchWiki").keypress((e) => {
    if (e.which === 13) {
      $(".searchButton").click();
    }
  });
});
