<template>
  <div id="timer">
    <h1 class="pageTitle">pomodoro timer</h1>

    <div class="inputWrapper">

      <div id="session-label" class="labels">
        Work Timer
        <div class="inline">
          <button id="session-increment" @click="incSess">
            +
          </button>
          <span id="session-length"></span>
          <button id="session-decrement" @click="decSess">
            -
          </button>
        </div>
      </div>

      <div id="break-label" class="labels">
        Break Timer
        <div class="inline">
          <button id="break-increment" @click="incBreak">
            +
          </button>
          <span id="break-length"></span>
          <button id="break-decrement" @click="decBreak">
            -
          </button>
        </div>
      </div>

    </div><!-- inputWrapper -->

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
      // update child component timer display to reflect when user changes session length
      document.getElementById('time-left').innerText = `${this.workTime}:00`;
    },
  },

};
</script>

<style lang="scss">
html {
  background-color: #222;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 32px;
  font-size: 16px;
}

.inputWrapper {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: center;
  width: 50%;
  margin: auto;
}

.labels {
  margin: 0.5rem;
  padding: 0.5rem;
}

button {
  border: 0;
  background: none;
  color: white;
}

.angle-up {
  font-size: 1rem;
  color: #fff;
}

</style>
