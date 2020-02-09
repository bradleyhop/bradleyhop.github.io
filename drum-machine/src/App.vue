<template>
  <div id="app-container">
    <div id="display">Game Boy Beats</div>
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
  font-family: monospace;
  font-size: 24px;
}
#app-container {
  text-align: center;
  margin-top: 60px;
}
#display {
  background: #94c11f;
  width: 40%;
  padding: 20px;
  margin: auto;
}
</style>
