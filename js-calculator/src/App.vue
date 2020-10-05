<script>
import Calculator from './components/Calculator.vue';

export default {
  name: 'App',

  components: {
    Calculator,
  },

};
</script>

<template>
  <div id="app">
    <h1 class="title">JavaScript Calculator for freeCodeCamp</h1>

    <div class="flex-wrapper">
      <div class="project-wrapper">
        <h2 class="project-title">Texas Instruments SR-10</h2>
        <p>This calculator fulfills the
          <a
            href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator"
            class="project-link" rel="noopener">
            "Front End Libraries Projects - Build a JavaScript Calculator"</a> project for
          freeCodeCamp. The design is inspired by one of the first scientific calculators, the
          Texas Instruments SR-10. The calculator originally sold for $150 in 1973. More
          information can be found at
          <a href="https://americanhistory.si.edu/collections/search/object/nmah_334394"
             class="smithsonian" rel="noopener">Smithsonian's Nation Museum of American History</a>
          as part of their online collection.
        </p>
        <p>This app uses <a href="https://vuejs.org" class="vue-link" rel="noopener">Vue</a> and
          <a href="https://sass-lang.com" class="sass-link" rel="noopener">Sass</a>. The
          <a href="https://mathjs.org" class="mathjs-link" rel="noopener">math.js</a>
          library handles the calculations and arithmetic operations using formula/expression logic.
          There are seven places of precision to reflect the SR-10's display limitations.
        </p>
        <p>Created and Designed by<br>
          <a href="https://bradleyhop.github.io" class="me-link" target="_blank" rel="noopener">
            Bradley Smith</a> &copy; 2020
        </p>
      </div>

      <Calculator />

      </div><!-- flex-wrapper -->
    </div>
</template>

<style lang="scss">
// responsive vars
$mobile-responsive: 600px;

// color vars
$body-background-color: #f8f8f8;
$fcc-green: #006400;
$smith-link: #333f48;
$vue-link: #35495e;
$sass-link: #bf4080;
$mathjs-link: #d43811;

* {
  box-sizing: border-box;

  &::before {
    box-sizing: border-box;
  }

  &::after {
    box-sizing: border-box;
  }
}

html {
  font-size: 17px;
  margin: 0;
  padding: 0;

  @media only screen and (min-width: $mobile-responsive) {
    font-size: 18px;
  }
}

body {
  background-color: $body-background-color;
  font-family: 'Source Sans Pro', sans-serif;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.title {
  color: $fcc-green;
  font-weight: lighter;
  text-align: center;
}

.flex-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;

  @media only screen and (min-width: $mobile-responsive) {
    flex-wrap: none;
  }
}

.project-wrapper {
  width: 98%;

  @media only screen and (min-width: $mobile-responsive) {
    width: 30%;
  }
}

.project-title {
  text-align: center;
}

.project-link {
  color: $fcc-green;
}

.smithsonian {
  color: $smith-link;
}

.vue-link {
  color: $vue-link;
}

.sass-link {
  color: $sass-link;
}

.mathjs-link {
  color: $mathjs-link;
}

.me-link {
  color: $fcc-green;
}
</style>
