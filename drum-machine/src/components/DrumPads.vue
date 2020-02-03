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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#button-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.drum-pad {
  border: 1px solid black;
  margin: 10px;
  height: 40px;
  width: 40px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

  &:hover {
    background: white;
  }

  &:active {
    background: green;
  }
}

.pressed-drum-pad {
  background: green;
  box-shadow: unset;
}
</style>
