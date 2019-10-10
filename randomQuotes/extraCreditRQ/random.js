var quote, author;
const quoteEl = document.getElementById('quotelives');

async function getQuote() {
  const response = await fetch(
      'https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json'
  );
  const myQuote = await response.json();
  quote = myQuote.quote;
  author = myQuote.author;
  quoteEl.innerHTML = `<p>${quote}<br>--  ${author}<br><br><br>Press ENTER for new quote or 'T' to share this quote via Twitter.</p>`;
}

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    getQuote().catch(error => console.log(error));
  }

  if (event.key === 'T' || event.key === 't') {
    if (typeof quote !== 'undefined' || typeof author !== 'undefined') {
      if (quote.length > 180) {
        quote = quote.slice(0, 180) + '...';
      }
      window.open(
        'https://twitter.com/intent/tweet?hashtags=randomQuoteGenerator,freecodeCamp&url=https://bit.ly/1THoBDa&related=freecodecamp&text=' +
          encodeURIComponent(`"${quote}" - ${author}`), "_self"
      );
    } else {
      quoteEl.innerHTML =
        '<p>No quote has been fetched, yet!<br>Please press ENTER to get a quote.</p>';
    }
  }
});
