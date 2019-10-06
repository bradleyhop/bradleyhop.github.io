var quote, author;

$(document).keypress(function(event) {

  if (event.key === "Enter") {
    $.getJSON(
      "http://quotes.stormconsultancy.co.uk/quotes/random.json",
      json => {
        quote = json.quote;
        author = json.author;
      }
    ).then(() =>
      $(".quotelives").html(
        `<h2>${quote}<br>--  ${author}<br><br><br>Press ENTER for new quote or 'T' to share this quote via Twitter.</h2>`
      )
    );
  }

  if (event.key === "T" || event.key === "t") {
    if (typeof quote !== "undefined" || typeof author !== "undefined") {
      if (quote.length > 65) {
        quote = quote.slice(0, 65) + "...";
      }
      window.open(
        "https://twitter.com/intent/tweet?hashtags=randomQuoteGenerator,freecodeCamp&url=https://bit.ly/1THoBDa&related=freecodecamp&text=" +
          encodeURIComponent(`"${quote}" - ${author}`)
      );
    } else {
      $(".quoteLives")
        .empty()
        .append(
          "<h2>No quote has been fetched, yet!<br>Please press ENTER to get a quote.</h2>"
        );
    }
  }
});
