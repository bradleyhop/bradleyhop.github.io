<template>
  <div id="drum-machine" class="focus-visible" role="main">
    <div class="wrapper-display">
      <span class="power-light"></span>
      <span id="display" aria-hidden="true">Game Boy Drum Machine</span>
    </div>
    <DrumPads />
    <div class="speaker-grill">
      <span class="speaker-holes sh1"></span>
      <span class="speaker-holes sh2"></span>
      <span class="speaker-holes sh3"></span>
    </div>
  </div>
</template>

<script>
import DrumPads from './components/DrumPads.vue';

export default {
  name: 'app',
  components: {
    DrumPads,
  },
};
</script>

<style lang="scss">
// Note: the original Game Boy has a resolution of 160px x 144px, so much of the
//  scaling is done to that resolution. Converted to rem using 20px as base.

$width-gameboy: 8rem;
$height-gameboy: 7.2rem;

$responsive-width: 599px;

$light-grey: #bfbcb7;
$deep-grey: #555362;
$spinach-screen: #94c11f;

@font-face {
  font-display: swap;
  font-family: 'Pixelated';
  src: url("../public/assets/Pixeled.ttf");
}

html {
  font-family: 'Pixelated', monospace;
  font-size: 20px;
  height: 100%;
  min-height: 100%;
}

body {
  background-color: $light-grey;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;

  @media only screen and (min-width: $responsive-width) {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(../public/assets/gb.webp);
  }
}

.title-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}

// next four rules needed for the focus-visible polyfill; gives focus on keyboard navigation only

::-moz-focus-inner {
  border: 0;
}

:focus {
  outline: none;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

.focus-visible {
  border: #fff solid 0.1rem;
  border-radius: 50%;
}

// end focus-visible polyfill rules

#drum-machine {
  background: $light-grey;
  border: none;
  border-radius: 0.45rem 0.45rem 2.5rem 0.45rem;
  height: calc(4.5 * #{$height-gameboy});
  margin: auto;
  padding: 1rem;
  text-align: center;
  width: calc(2.5 * #{$width-gameboy});

  @media only screen and (min-width: $responsive-width) {
    border: 0.1rem solid $deep-grey;
  }
}

.wrapper-display {
  background: $deep-grey;
  border-radius: 0.45rem 0.45rem 2.5rem 0.45rem;
  height: calc(1.8 * #{$height-gameboy});
  margin: auto;
  padding-top: calc(0.25 * #{$height-gameboy});
  width: calc(2.25 * #{$width-gameboy});
}

.power-light {
  background:
    radial-gradient(
      circle,
      #f00 40%,
      #000 100%,
    );
  border-radius: 50%;
  border-style: none;
  float: left;
  height: 0.6rem;
  margin-left: 1.25rem;
  margin-top: 3rem;
  width: 0.6rem;
}

#display {
  align-items: center;
  background: $spinach-screen;
  display: flex;
  height: calc(1.5 * #{$height-gameboy});
  justify-content: center;
  margin-left: calc(0.4 * #{$width-gameboy});
  width: calc(1.5 * #{$width-gameboy});
}

.speaker-grill {
  float: right;
  padding-right: 0.5rem;

  @media only screen and (min-width: $responsive-width) {
    padding: 0;
  }
}

.speaker-holes {
  background: $deep-grey;
  border-radius: 0.1rem;
  display: inline-block;
  height: 3.5rem;
  margin-right: 1.25rem;
  transform: rotate(-40deg);
  width: 0.2rem;
}

.sh1 {
  margin-top: 0.5rem;
}

.sh2 {
  margin-top: 1rem;
}

.sh3 {
  margin-top: 1.5rem;
}
</style>
