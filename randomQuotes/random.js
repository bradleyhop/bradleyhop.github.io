/*
 * Note: using an api that is not secure. Using cor-anywhere to solve cors
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
      console.log("getQuote fired!");
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json'
      );
      const myQuote = await response.json();
      this.text = myQuote.quote;
      this.author = myQuote.author;
    }
  },
});
