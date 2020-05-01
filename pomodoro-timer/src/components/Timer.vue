<template>
  <div id="timer">

    <div class="timerControls">
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
  name: 'Timer',
  data() {
    return {
      sessionLabel: 'Time to work!', // default to start with work session
      displayTime: '',
      timmerRunning: false,
      timeElapsed: 0,
      working: true,
      timeInc: null, // placeholder for setTimeout()
    };
  },
  methods: {
    resetTimer() {
      this.$parent.workTime = 25;
      this.$parent.playTime = 5;
      this.timeElapsed = 0;
      this.timmerRunning = false;
      this.displayTime = '25:00';
      this.sessionLabel = 'Time to work!';
      clearInterval(this.timeInc);
    },

    startTimer() {
      const countdown = Math.floor((this.$parent.workTime * 60) / 100);
      if (!this.timmerRunning) {
        this.timmerRunning = true;
        this.incrementTime(countdown);
      } else {
        this.timmerRunning = false;
      }
    },

    incrementTime(enditnow) {
      // let deadline = new Date().getTime();

      // // set current countdown time based on either work or break session
      // deadline += this.working ? this.$parent.workTime * 60000 : this.$parent.playTime * 60000;
      if (this.timmerRunning) {
        this.timeInc = setTimeout(() => {
          // set to setTimeout() interval, in ms
          this.timeElapsed += 1;

          // const now = new Date().getTime();
          const interval = enditnow - this.timeElapsed;
          const minutes = Math.floor(interval / 10 / 60);
          const seconds = Math.floor((interval / 10) % 60);


          this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

          /*
           * if (this.timeElapsed < 100) {
           *   this.timeElapsed = 0;
           *   this.timmerRunning = false;
           *   this.displayTime = '00:00';
           *   this.sessionLabel = 'Take a break!';
           *   this.working = false;
           *   clearTimeout(this.timeInc);
           *   this.startTimer();
           * }
           */

          this.incrementTime(enditnow);
        }, 100);
      }
    },

    formatTime(time) {
      // return number so that time is in a MM:SS format
      return time < 10 ? `0${time}` : time;
    },

  },

  mounted() {
    this.displayTime = `${this.formatTime(this.$parent.workTime)}:00`;
  },

  beforeDestroy() {
    clearTimeout(this.timeInc);
  },

};
</script>

<style lang="sass" scoped>

</style>
