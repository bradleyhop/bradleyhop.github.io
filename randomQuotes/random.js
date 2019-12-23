/*
 * Note: using an api that is not secure. Using cor-anywhere to resolve cors
 * issues.
 */

var quote = new Vue({
  el: '#quote-box',
  data: {
    text: '',
    author: ''
  },
  methods: {
    async getQuote() {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json'
        );
        const myQuote = await response.json();
        this.text = myQuote.quote;
        this.author = "- " + myQuote.author;
      } catch(err) {
        this.text = 'Quote cannot be fetched at this time. Please try again later.';
        console.log(err);
      }
    },
    tweetQuote(event) {
      if (this.text.length > 200)
        this.text = this.text.slice(0, 200) + '...';
      window.open(
        'https://twitter.com/intent/tweet?' +
        'hashtags=randomQuoteMachine,freeCodeCamp&related=freecodecamp&text=' +
        encodeURIComponent(`"${this.text}" ${this.author}`), "_self"
      );
      // refuse to share quote if none fetched error handling?
      // this.text = 'No quote has been fetched, yet!';
    }
  },
  mounted() {
    this.getQuote();
  }
});
