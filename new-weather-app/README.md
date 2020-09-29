# new-weather-app

## A simple weather app!

* Load user location upon page load Retreive data about weather conditions
* Display that data to the user in a meaningful way Show any errors encountered
* and give the user a button to reload the page

This project is from the freeCodeCamp Take Home Project: [Show the Local
Weather](https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/show-the-local-weather).

## How It Is Bulit

### Framework

Update: Now uses Vue 3!

Using Vue and the Vue CLI to manage packages and builds. Sass for the CSS.
Eslint and stylelint with Vue-specific rules.

### API

Since there is no backend to this project, there is no secure way to hide an API
key that most weather services require to retrieve data. So, I'm using the
workaround that freeCodeCamp has implemented: [freeCodeCamp Weather API
Passthrough](https://fcc-weather-api.freecodecamp.repl.co/).

One drawback is a slower speed. Another is that this API seems to default to a
town in Japan instead of reliably returning data based on given latitude and
longitude.  As a workaround, there is a check for this error and displays as
such because I doubt many are actually calling this app from that particular
location. The user can then press a button to reload the page and try again. The
issue with the wrong data being served from the API is described here, with the
thread being closed without the bug every being fully resolved:
[FCC Weather API randomly returning Japan weather #16869](https://github.com/freeCodeCamp/freeCodeCamp/issues/16869)

