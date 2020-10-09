# js-calculator

This calculator fulfills the ["Front End Libraries Projects - Build a JavaScript Calculator"](href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator")
project for freeCodeCamp. The design is inspired by one of the first scientific
calculators, the Texas Instruments SR-10.

## Technologies

This app uses Vue CLI, Sass, and the [math.js](https://mathjs.org) library to
handle the calculations and arithmetic operations using formula/expression
logic. I also implemented Open Graph metadata for social media card preview and
SEO. A custom font is loaded for the calculator's display.

UPDATE: Migration from Vue 2 to Vue 3 now complete.

## Live Build

The live app is found [here](https://bradleyhop.github.io/js-calculator/).

## Challenges Encountered

This project is written to satisfy the freeCodeCamp project requirements and has
a tool to verify that the User Stories are satisfied. The tool provided by
freeCodeCamp does not officially support Vue, however, most features of Vue are
compatible with the test script save Vue's text-interpolation. So instead of
using Vue's text-interpolation directives in the html, I opted to use vanilla
javascript to set values within the document.  Hacky, yes, but the tests all
pass, which helps ensure that I'm meeting the criteria so seems worth it to me.
