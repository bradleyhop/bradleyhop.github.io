<template>
  <div id="timer">

    <div class='inline'>
      <div id="session-label">
        Work Timer
        <div>
          <button id="session-decrement">-</button>
          <div id="session-length">
          {{ workTime }}
          </div>
          <button id="session-increment">+</button>
        </div>
      </div>
    </div>

    <div class="inline">
      <div id="break-label">
        Break Timer
        <div>
          <button id="break-decrement">-</button>
          <div id="break-length">
          {{ playTime }}
          </div>
          <button id="break-increment">+</button>
        </div>
      </div>
    </div>

    <div class="inline">
      <button id="reset" @click="resetTimer">
        reset
      </button>
      <button id="start_stop" @click="startTimer">
        start/stop
      </button>
    </div>

    <div id="timer-label">
      Session
      <div id="time-left">
        {{ displayTime }}
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      workTime: '25',
      playTime: '5',
      displayTime: '25:00',
    };
  },

  methods: {
    startTimer() {
      const timeSet = new Date().getTime();

      this.displayTime = timeSet;
    },

    resetTimer() {
      this.workTime = '25';
      this.playTime = '5';
      this.displayTime = '25:00';
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
