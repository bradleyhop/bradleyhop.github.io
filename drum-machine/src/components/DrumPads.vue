<template>
  <div id="button-box">
    <div v-for="drum in drumpad" :key="drum.id">
      <button class="drum-pad" :id="drum.desc" @click="clickDrum(drum.letter)">
        <audio preload="auto" :src="drum.source" class="clip" :id="drum.letter"
          type="audio/mp3">
        </audio>
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
    clickDrum(e) {
      this.$parent.hitDrum(e);
    },
  },
};
</script>

<style lang="scss">
$gb-button: #84338e;
$pressed-gb-button: #a988a7;
$responsive-width: 599px;

#button-box {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  justify-items: center;
  margin: auto;
  padding-top: 1rem;
  width: 90%;

  @media (max-width: $responsive-width) {
    width: 90%;
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
  font-family: 'Pixelated', monospace;
  font-size: 0.5rem;
  height: 60px;
  margin: 10px;
  width: 60px;

  &:hover {
    background: $gb-button;
  }

  &:active {
    background: $pressed-gb-button;
  }
}

.pressed-drum-pad {
  background: $pressed-gb-button;
  box-shadow: unset;
}
</style>
