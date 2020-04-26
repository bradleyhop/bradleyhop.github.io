<template>
  <div id="timer">

    <div class='inline'>
      <div id="session-label">
        Work Timer
        <div>
          <button id="session-decrement" @click="decSess">
            -
          </button>
          <div id="session-length">
            {{ workTime }}
          </div>
          <button id="session-increment" @click="incSess">
            +
          </button>
        </div>
      </div>
    </div>

    <div class="inline">
      <div id="break-label">
        Break Timer
        <div>
          <button id="break-decrement" @click="decBreak">
            -
          </button>
          <div id="break-length">
            {{ playTime }}
          </div>
          <button id="break-increment" @click="incBreak">
            +
          </button>
        </div>
      </div>
    </div>

    <div class="inline">
      <button id="reset" @click="resetTimer">
        reset
      </button>
      <button id="start_stop" @click="startTimer">
        start/pause
      </button>
    </div>

    <div id="timer-label">
      {{ sessionLabel }}
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
      workTime: 25,
      playTime: 5,
      sessionLabel: 'Time to work!',
      displayTime: '25:00',
    };
  },

  methods: {
    decSess() {
      if (this.workTime > 1) {
        this.workTime -= 1;
      }
    },
    incSess() {
      if (this.workTime < 59) {
        this.workTime += 1;
      }
    },
    decBreak() {
      if (this.playTime > 1) {
        this.playTime -= 1;
      }
    },
    incBreak() {
      if (this.playTime < 60) {
        this.playTime += 1;
      }
    },

    startTimer() {
      // get timer limit
      const deadline = new Date().getTime() + (this.workTime * 60000);

      const countdown = setInterval(() => {
        // timer from minutes to milliseconds, add to current time
        const now = new Date().getTime();
        const interval = deadline - now;
        let minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((interval % (1000 * 60)) / 1000);

        // format numbers to have a 00:00 MM:SS format
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        this.displayTime = `${minutes}:${seconds}`;


        if (interval < 1) {
          clearInterval(countdown);
          this.displayTime = '00:00';
          this.workTime = this.playTime;
          this.sessionLabel = 'Take a break!';
          this.startTimer();
        }
      }, 1000); // interval interupt in ms
    },

    resetTimer() {
      this.workTime = 25;
      this.playTime = 5;
      this.displayTime = '25:00';
      this.sessionLabel = 'Time to work!';
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
