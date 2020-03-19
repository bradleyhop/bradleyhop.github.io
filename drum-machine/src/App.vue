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
import gbDrums from './drumkit';

export default {
  name: 'app',
  components: {
    DrumPads,
  },
  methods: {
    hitDrum(inst) {
      const hit = inst.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(hit) >= 0) {
        this.playAudio(document.getElementById(hit));
        this.styleDrumHit(hit);
      }
    },
    styleDrumHit(styleHit) {
      const discriptionDisplay = gbDrums.find((hit) => hit.letter === styleHit).desc;

      // add flash styling to button press
      document.getElementById(discriptionDisplay)
        .classList.add('pressed-drum-pad');
      setTimeout(() => document.getElementById(discriptionDisplay)
        .classList.remove('pressed-drum-pad'), 150);

      // Using pure js to pass user story 8 since doing it via Vue
      //  doesn't register with the test script
      document.getElementById('display').innerText = discriptionDisplay;
    },
    playAudio: async (el) => {
      const playObj = el;
      try {
        // reduces perceived latency playback on button press/function call
        playObj.currentTime = 0;
        await playObj.play();
      } catch (err) {
        // eslint-disable-next-line
        console.error(`Playback error! ${err}`);
      }
    },
  },
  created() {
    window.addEventListener('keyup', (e) => this.hitDrum(e.key));
  },
  // not sure if needed since this is a SPA, but why not prevent memory leaks?
  beforeDestroy() {
    window.removeEventListener('keyup', (e) => this.hitDrum(e.key));
  },
};
</script>

<style lang="scss">
// Note: the original Game Boy has a resolution of 160 x 144, so much of the
//  scaling is done to that resolution.

$responsive-width: 599px;
$light-grey: #bfbcb7;
$deep-grey: #555362;

@font-face {
  font-family: 'Pixelated';
  src: url("../public/assets/Pixeled.ttf");
}

html {
  background-color: $light-grey;
  background-image: url(../public/assets/gb.webp);
  font-family: 'Pixelated', monospace;
  font-size: 20px;
  overflow: hidden;

  @media (max-width: $responsive-width) {
    background-image: none;
  }
}

body {
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  margin: 0;
  padding: 20px 0;
  position: absolute;
  width: 100%;

  @media (max-width: $responsive-width) {
    background: initial;
  }
}

#app-container {
  background: $light-grey;
  border: 2px solid $deep-grey;
  border-radius: 9px 9px 50px 9px;
  height: calc(4.5 * 144px);
  margin: auto;
  padding: 1rem;
  text-align: center;
  width: calc(2.5 * 160px);

  @media (max-width: $responsive-width) {
    border: none;
    height: 100%;
    padding: 0;
    width: 100%;
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
  background: #94c11f;
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
