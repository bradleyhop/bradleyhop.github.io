function getQuote() {
    /* Having to use a CORS proxy b/c of insecure json, and Chrome
     * security features. A bandaid for copepen.
     * Impossible for me to fix because server providing json isn't
     * configured for CORS.
     */
    $.getJSON('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json', function(json) {
        quote = json.quote;
        author = json.author;

        $('.quotelives').html("<h2>" + quote + "<br>-- " + author + "<br><br><br>Press ENTER for new quote or 'T' to share this quote via Twitter.</h2>");
    });
}

// Trim quote down for twitter
function twitterChop(currentQuote) {
    if (currentQuote.length > 65) {
        return currentQuote.slice(0, 65) + "...";
    }
}

$(document).keypress(function(event) {

    /* Get new quote when 'enter'
     * key is pressed
     */
    if (event.which === 13) {
        getQuote();
    }
    /* Send quote to twitter when
     * 'T' or 't' is pressed
     */
    if (event.which === 84 || event.which === 116) {
        var twitterFriendly = '"' + quote + '..."' + ' - ' + author;

        if (typeof quote != 'undefined' || typeof author != 'undefined') {
            quote = twitterChop(quote);

            window.open('https://twitter.com/intent/tweet?hashtags=randomQuoteGenerator&url=https://bit.ly/1THoBDa&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '"' + ' - ' + author));
        } else {
            $('#quoteLives').empty().append("<h2>No quote has been fetched, yet!<br>Please click below to get a quote.</h2>");
        }
        window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(twitterFriendly));
    }
});
