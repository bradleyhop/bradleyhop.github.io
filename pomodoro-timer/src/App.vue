<template>
  <div id="timer">

    <div id="session-label">
      Work Timer
      <div>
        <button id="session-increment" @click="incSess">
          +
        </button>
        <div id="session-length"></div>
        <button id="session-decrement" @click="decSess">
          -
        </button>
      </div>
    </div>

    <div id="break-label">
      Break Timer
      <div>
        <button id="break-increment" @click="incBreak">
          +
        </button>
        <div id="break-length"></div>
        <button id="break-decrement" @click="decBreak">
          -
        </button>
      </div>
    </div>

    <Timer />

  </div>
</template>

<script>
import Timer from './components/Timer.vue';

export default {
  name: 'App',

  components: {
    Timer,
  },

  data() {
    return {
      workTime: 25,
      playTime: 5,
    };
  },

  methods: {
    decSess() {
      if (this.workTime > 1) {
        this.workTime -= 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    incSess() {
      if (this.workTime < 60) {
        this.workTime += 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    decBreak() {
      if (this.playTime > 1) {
        this.playTime -= 1;
        document.getElementById('break-length').innerText = this.playTime;
      }
    },
    incBreak() {
      if (this.playTime < 60) {
        this.playTime += 1;
        document.getElementById('break-length').innerText = this.playTime;
      }
    },
  },

  mounted() {
    document.getElementById('session-length').innerText = this.workTime;
    document.getElementById('break-length').innerText = this.playTime;
  },

  watch: {
    workTime() {
      document.getElementById('time-left').innerText = `${this.workTime}:00`;
    },
  },

};
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
