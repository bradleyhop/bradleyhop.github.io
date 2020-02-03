<template>
  <div id="app">
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
      let discriptionDisplay = gbDrums.find(hit => hit.letter === styleHit);
      discriptionDisplay = discriptionDisplay.desc;

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
        await el.play();
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
#app {
  font-family: monospace;
  font-size: 24px;
  text-align: center;
  margin-top: 60px;
}
</style>
