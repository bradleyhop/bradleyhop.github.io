# pomodoro-timer

Bradley Smith coded this app in Spring 2020 for the freeCodeCamp.org Front End
Libraries Projects - Build A Pomodoro Clock. (Edit: The project is now entitled
Build a 25 + 5 Clock.) The app satisfies the required [user
stories](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-25--5-clock).

[See the live app here](https://bradleyhop.github.io/pomodoroTimer)

NOTE: Please choose the "25 + 5 Clock" option on the testing suite.

## Framework and Tools

I used Vue.js to write and the Vue CLI to initialize, maintain,
develop, and build the app. I use eslint configured with the airbnb style rules.
For CSS, I use SCSS and stylelint. The  focus-visible polyfill maintains a clean
interface on mouse clicks while still ensuring keyboard navigation
accessibility.

To the user, the enso appears to be drawn as the timer counts down. This is
not what is actually happening! The enso is a static svg image. ProgressBar.js
provides the tweening functionality of an overlaying progress bar. The progress
bar animates backwards in fill from 1 to 0. There are two layers to the circular
progress bar: the first fill is filled with the same color as the background;
the second fill has an 100% alpha layer and so slowly reveals the svg image
underneath. The progress bar was then rotated and flipped so as to start as if
the enso is being painted with a brush.

Finally, FontAwesome is built into the app with only the icons that I need that
are built into the distributable build.

## For Those Unacquainted with Vue

What did I write? Most of my code is in the src/App.vue and
src/components/Timer.vue files. These two files are the Vue instance and where
the structure, logic, and styling of the app resides. There are also tweaks in
src/main.js to include the added libraries. The public/index.html contains Open
Graph metadata for previews of the app on social media sites.
