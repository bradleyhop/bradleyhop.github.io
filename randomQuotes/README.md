# Random Quote Generator

(9/27/21) This is an old project that was broken, which bothered me. So finally,
I have fixed it.  Instead of using an API to grab a random quote, which required
an additional service to serve the quote through https, I have found a
collection of quotes in json format that I have downloaded and massaged to my
liking. The file, quotes.js, has the original json downloaded from the git repo.
I have filtered each object so that only the english quote and author remains;
also, only quotes with a rating of 4 or higher remain. I know little about how
this cache was compiled, but I am thankful for it. The top quotes are now in the
javascript file along with the Vue logic needed for the page.

The quotes were taken from [here](https://github.com/skolakoda/programming-quotes-api).

I also touched up the styling so that the page hints at a 4:3 glowing-text CRT
monitor from days of olde.
