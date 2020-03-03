<template>
  <div id="app-container">
    <div class="wrapper-display">
      <span class="power-light"></span>
      <span id="display">Game Boy Beats</span>
    </div>
    <DrumPads />
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
      const discriptionDisplay = gbDrums.find(hit => hit.letter === styleHit).desc;

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
    window.addEventListener('keyup', e => this.hitDrum(e.key));
  },
  // not sure if needed since this is a SPA, but why not prevent memory leaks?
  beforeDestroy() {
    window.removeEventListener('keyup', e => this.hitDrum(e.key));
  },
};
</script>

<style lang="scss">
html {
  background: #bfbcb7;
  font-family: 'Peepo', monospace;
  font-size: 24px;
}

body {
  margin: 0;
  padding: 0;
}

#app-container {
  text-align: center;
  margin-top: 60px;
}

.wrapper-display {
  background: #555362;
  border-radius: 9px 9px 40px 9px;
  width: calc(2.25 * 160px);
  height: calc(1.8 * 144px);
  margin: auto;
  padding-top: calc(0.25 * 144px);
}

.power-light {
  display: inline-block;
  float: left;
  background: red;
  border-style: none;
  border-radius: 50%;
  margin-left: 25px;
  margin-top: 60px;
  height: 12px;
  width: 12px;
}

#display {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #94c11f;
  border-radius: 5px;
  width: calc(1.5 * 160px);
  height: calc(1.5 * 144px);
  margin-left: calc(0.4 * 160px);
}
</style>
