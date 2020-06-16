# Wikipedia Search & Preview App

[Live Site Here](https://bradleyhop.github.io/wikiSearchApp/)

## Objective and User Stories

SPA that takes a user's search term, interfaces with Wikimedia's web service
API, and displays ten articles relevant to the user's search in a card format.
The first article shown is usually the most relevant and so is displayed at top
and in a singular color. All other results are displayed below that in a
different color. The user can click on the card to go to that Wikipedia article.

If no articles are found, the user is informed and is invited to make a page
based on this new term. If there is any error fetching the data from the API, an
error is displayed to the saying so and what the error is.

See the
[freeCodeCamp](https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/build-a-wikipedia-viewer)
page for project requirements.

## Technologies and Strategies

I finished this project a while ago when this particular project was a part of
the freeCodeCamp curriculum using the jQuery and bootstrap libraries. I decided
to return to it as a way to practice refactoring code.

The application now uses ES6 features such as arrow functions and promises, the
javascript logic is simpler and more efficient, ~~the built-in `fetch()` method
grabs the data from the API (instead of jQuery's `$.ajax`),~~ $.ajax grabs the
data since jQuery remains in the app to avoid cross-compatibility errors, and
bootstrap and fontawesome dependencies are current. The site is now more
accessible by providing aria-labels and titles for all elements that require
them.

One of the most challenging aspect of this refactor was finding the parameters
to get the information from the Wikimedia API. Originally, the
`action=opensearch` parameter would return an extract from the Wikipedia
article; [this is no longer the case and now returns an array of empty strings
instead.](https://phabricator.wikimedia.org/T241437) Using this issue tracker as
a place to start, I found the parameters that I needed using the Wikimedia [API
Sandbox.](https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm)
