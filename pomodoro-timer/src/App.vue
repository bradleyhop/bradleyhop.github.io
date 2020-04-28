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
      workTime: 1,
      playTime: 2,
      sessionLabel: 'Time to work!',
      displayTime: '',
      timmerRunning: false,
      timeElapsedOnPause: 0,
      timeElapsed: 0,
      working: true,
      countdown: null,
    };
  },

  methods: {
    decSess() {
      if (this.workTime > 1) {
        this.workTime -= 1;
      }
    },
    incSess() {
      if (this.workTime < 60) {
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

    resetTimer() {
      this.workTime = 25;
      this.playTime = 5;
      this.timeElapsedOnPause = 0;
      this.timmerRunning = false;
      this.displayTime = '25:00';
      this.sessionLabel = 'Time to work!';
      clearInterval(this.countdown);
    },

    startTimer() {
      if (this.timmerRunning) {
        this.timmerRunning = false;
        this.timeElapsedOnPause += 1000;
      } else {
        let deadline = new Date().getTime();
        this.timmerRunning = true;

        deadline += this.working ? this.workTime * 60000 : this.playTime * 60000;

        this.countdown = setInterval(() => {
          if (this.timmerRunning) {
            const now = new Date().getTime();
            const interval = deadline - now - this.timeElapsedOnPause;
            const minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((interval % (1000 * 60)) / 1000);

            this.timeElapsedOnPause = 0;
            // set to setInterval() timer
            this.timeElapsed += 1000;

            this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

            if (interval < 1) {
              clearInterval(this.countdown);
              this.timeElapsed = 0;
              this.displayTime = '00:00';
              this.sessionLabel = 'Take a break!';
              this.working = false;
              this.startTimer();
            }
          }
        }, 1000);
      }
    },

    formatTime(time) {
      // return number so that time is in a MM:SS format
      const formatedTime = time < 10 ? `0${time}` : time;
      return formatedTime;
    },

  },

  mounted() {
    this.displayTime = `${this.formatTime(this.workTime)}:00`;
  },

  beforeDestroy() {
    clearInterval(this.countdown);
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
