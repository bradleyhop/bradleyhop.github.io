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
            console.log("error getting query results");
        });

}

// given the json object, which is mostly empty, display a helpful
//  diaglouge saying no page exists and linking to make a request
function noResults(results) {

    let emptyResult = "<div class='noResults'><h3>" +
        "The page '" + results[0] + "' does not exist. " +
        "You can " +
        "<a href=" +
        "'https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation'" +
        " target='_blank'>" +
        "ask for it to be created." +
        "</a></h3></div>";
    $(".results").append(emptyResult);

}


// given the json object, display title and description with the link to
//  the article
function displayResults(results) {

    // first result is usually what we're looking for,
    //  so lets give it special attention
    let mainResult = "<a href='" +
        results[3][0] + "' target='_blank' >" +
        "<div class='mainSearchResult'><h2>" +
        results[1][0] + "</h2>" +
        results[2][0] + "</div></a>";
    $(".results").append(mainResult);

    // secondary results, if any
    for (let i = 1; i < results[1].length; i++) {
        let secResult = "<a href='" +
            results[3][i] + "' target='_blank' >" +
            "<div class='altResults'><h3>" +
            results[1][i] +
            "</h3>";
        if (results[2][i] === "") {
            secResult += "No description given. " +
                "Click link above for article.</div></a>";
        } else {
            secResult += results[2][i] +
                "</div></a>";
        }
        //console.log(secResult);
        $(".results").append(secResult);
    }

}


$(document).ready(function() {

    // get the search term from the user on enter or button press
    $(".searchButton").click(function() {
        let userQuery = $(".searchWiki").val();
        let endPointURL = "https://en.wikipedia.org/w/api.php" +
            "?action=opensearch&search=" + userQuery +
            "&format=json&origin=*";
        getResults(endPointURL).done(function(data) {
            // do the success stuff here
            if (data[1].length === 0) {
                noResults(data);
            } else {
                displayResults(data);
            }
        });
    });
    // will search if enter or button pressed
    $(".searchWiki").keypress(function(e) {
        if (e.which === 13) {
            $(".searchButton").click();
        }
    });

});

