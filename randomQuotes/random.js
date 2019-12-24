var quote = new Vue({
  el: '#quote-box',
  data: {
    text: '',
    author: '',
    urlTweet: 'https://twitter.com/intent/tweet?'
  },
  methods: {
    async getQuote() {
      try {
        // Note: using an api that is not secure. Using cor-anywhere to resolve
        // cors issues.
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json'
        );
        const myQuote = await response.json();
        this.text = myQuote.quote;
        this.author = "- " + myQuote.author;
      } catch(err) {
        this.text =
          'Quote cannot be fetched at this time. Please try again later.';
        this.author = '';
        console.log(err);
      }
    },
    tweetQuote() {
      if (this.text.length > 200) {
        this.text = this.text.slice(0, 200) + '...';
      }
      this.urlTweet +=
        'hashtags=randomQuoteMachine,freeCodeCamp&related=freecodecamp&text=' +
        this.text + ' ' + this.author;
    }
  },
  mounted() {
    this.getQuote();
  }
});
