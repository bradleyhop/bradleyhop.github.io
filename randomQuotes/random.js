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
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/quotes/random.json'
      );
      const myQuote = await response.json();
      console.log(response);
      this.text = myQuote.quote;
      this.author = "- " + myQuote.author;
    },
  },
  mounted() {
    this.getQuote();
  }
});
