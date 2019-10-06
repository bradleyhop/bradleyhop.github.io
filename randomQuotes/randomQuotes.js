function getQuote() {
  /* Having to use a CORS proxy b/c of insecure json, and Chrome
   * security features.
   * Impossible for me to fix because server providing json isn't
   * configured for CORS.
   */
  $.getJSON('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json', function(json) {
    quote = json.quote;
    author = json.author;

    $('#quoteLives').empty().append("<h2>" + quote + "<br>-- " + author + "<br><br><br>Press 'New Quote' for another quote or press 'Tweet' to share this quote via Twitter.</h2>");
  });
}

// Trim quote down for twitter
function twitterChop(currentQuote) {
  if (currentQuote.length > 65) {
    quote = currentQuote.slice(0, 65) + "...";
  }
}

$(document).ready(function() {

  $("#newQuote").click(function() {
    getQuote();
  });

  $("#tweetThis").click(function() {
    // Check to see if first quote has been fetched
    if (typeof quote != 'undefined' || typeof author != 'undefined') {
      twitterChop(quote);

      window.open('https://twitter.com/intent/tweet?hashtags=randomQuoteGenerator&url=https://bit.ly/1THoBDa&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '"' + ' - ' + author));
    } else {
      $('#quoteLives').empty().append("<h2>No quote has been fetched, yet!<br>Please click below to get a quote.</h2>");
    }
  });

  // Open new window for other quote site
  $("#oldsite").click(function() {
    window.open("https://codepen.io/bradleyhop/full/EKmGRJ/");
  });
});
