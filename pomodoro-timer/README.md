# pomodoro-timer

Bradley Smith coded this app in Spring 2020 for the freeCodeCamp.org Front End
Libraries Projects - Build A Pomodoro Clock. The app satisfies the required
[user stories](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock).

See the live app [here](https://bradleyhop.github.io/pomodoroTimer)

Note: When running the automated test suite, please run in a private session for
the tests to execute properly. Some browser extensions can mess with the timing
just enough for some tests to not pass.

## Framework and Tools

I used Vue.js to write the app. I use the Vue CLI to initialize, maintain,
develop, and build. I use eslint configured with the airbnb style rules. For
CSS, I use SCSS and stylelint. The  focus-visible polyfill maintains a clean
interface on mouse clicks while still ensuring keyboard navigation
accessibility.

To the user, the enso appears to be drawn as the timer counts down. This is
not what is actually happening! The enso is a static svg image. ProgressBar.js
provides the tweening functionality. The progress bar animates backwards in fill
from 1 to 0. There are two layers to the circular progress bar: the first fill
is filled with the same color as the background; the second fill has an 100% alpha
layer and so slowly reveals the svg image underneath. The progress bar was then
rotated so as to start as if the enso was being painted with a brush.

Finally, FontAwesome is built into the app with only the icons that I need that
are built into the distributable build.

## For Those Unacquainted with Vue

What did I write? Most of my code is in the src/App.vue and
src/components/Timer.vue files. These two files are the Vue instance and where
the logic of the app resides. There are also tweaks in src/main.js to include
the added libraries.

The public/index.html contains Open Graph metadata for previews of the app on
social media sites.
