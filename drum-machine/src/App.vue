<template>
  <div id="app-container">
    <div class="wrapper-display">
      <span class="power-light"></span>
      <span id="display">Game Boy Beats</span>
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
  mounted() {
    const plugin = document.createElement('script');
    plugin.setAttribute(
      'src',
      '//unpkg.com/focus-visible',
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  },
};
</script>

<style lang="scss">
// Note: the original Game Boy has a resolution of 160 x 144, so much of the
//  scaling is done to that resolution.

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
}

body {
  align-items: center;
  background-color: $light-grey;
  background-image: url(../public/assets/gb.webp);
  box-shadow: inset 0 0 0 100vw rgba(0, 0, 0, 0.65);
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0 0;
  position: absolute;
  width: 100vw;

  @media (max-width: $responsive-width) {
    background-image: none;
    box-shadow: none;
  }
}

:focus {outline:none;} ::-moz-focus-inner {border:0;}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

.focus-visible {
  border: #fff solid 2px;
  border-radius: 50%;
}

#app-container {
  background: $light-grey;
  border: 2px solid $deep-grey;
  border-radius: 9px 9px 50px 9px;
  height: calc(4.5 * 144px);
  padding: 1rem;
  text-align: center;
  width: calc(2.5 * 160px);

  @media (max-width: $responsive-width) {
    border: none;
  }
}

.wrapper-display {
  background: $deep-grey;
  border-radius: 9px 9px 50px 9px;
  height: calc(1.8 * 144px);
  margin: auto;
  padding-top: calc(0.25 * 144px);
  width: calc(2.25 * 160px);
}

.power-light {
  background:
    radial-gradient(
      circle,
      red 40%,
      black 100%,
    );
  border-radius: 50%;
  border-style: none;
  float: left;
  height: 12px;
  margin-left: 25px;
  margin-top: 60px;
  width: 12px;
}

#display {
  align-items: center;
  background: $spinach-screen;
  border-radius: 5px;
  display: flex;
  height: calc(1.5 * 144px);
  justify-content: center;
  margin-left: calc(0.4 * 160px);
  width: calc(1.5 * 160px);
}

.speaker-grill {
  float: right;

  @media (max-width: $responsive-width) {
    padding-right: 10px;
  }
}

.speaker-holes {
  background: $deep-grey;
  border-radius: 2px;
  display: inline-block;
  height: 3.5rem;
  margin-right: 25px;
  transform: rotate(-40deg);
  width: 4px;
}

.sh1 {
  margin-top: 10px;
}

.sh2 {
  margin-top: 20px;
}

.sh3 {
  margin-top: 30px;
}
</style>
