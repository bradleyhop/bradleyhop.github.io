<template>
  <div id="button-box">
    <div v-for="drum in drumpad" :key="drum.id">
      <button
        class="drum-pad focus-visable"
        type="button"
        :id="drum.desc"
        @click="hitDrum(drum.letter)"
      >
        <audio preload="auto" :src="drum.source" :id="drum.letter" type="audio/mp3"></audio>
        {{ drum.letter }}
      </button>
    </div>
  </div>
</template>

<script>
import gbDrums from '../drumkit';

export default {
  name: 'DrumPads',
  data() {
    return {
      drumpad: gbDrums,
    };
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
      document.getElementById(discriptionDisplay).classList.add('pressed-drum-pad');
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
  beforeDestroy() {
    window.removeEventListener('keyup', (e) => this.hitDrum(e.key));
  },
};
</script>

<style lang="scss">
$gb-button: #84338e;
$pressed-gb-button: #a988a7;
$responsive-width: 599px;

/*
 * .js-focus-visible :focus:not(.focus-visible) {
 *   outline: none;
 * }
 * [> Optional: Customize .focus-visible <]
 * .focus-visible {
 *   outline: lightgreen solid 2px;
 * }
 */

/*
 * @mixin focusing {
 *   border: 3px solid #393c9f;
 * }
 */
/*
 *
 * :focus {outline:none;}
 * ::-moz-focus-inner {border:0;}
 */

#button-box {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  justify-items: center;
  margin: auto;
  padding-top: 1rem;
  width: 90%;

  @media (max-width: $responsive-width) {
    width: 100%;
  }
}

.drum-pad {
  background:
    radial-gradient(
      circle,
      rgba(132, 51, 142, 1) 60%,
      rgba(169, 136, 167, 1) 100%
    );
  border: none;
  border-radius: 50%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  color: #fcfcfc;
  font-family: 'Pixelated', monospace;
  font-size: 0.5rem;
  height: 60px;
  margin: 10px;
  width: 60px;

  /*
   * &:focus-visible {
   *   @include focusing;
   * }
   */
  /*
   * &::-moz-focusring {
   *   @include focusing;
   * }
   * &:focus-within {
   *   @include focusing;
   * }
   */

  &:hover {
    background-color: $gb-button;
  }

  &:active {
    background-color: $pressed-gb-button;
  }
}

.pressed-drum-pad {
  background: $pressed-gb-button;
  box-shadow: unset;
}
</style>
