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
    resetTimer() {
      this.$parent.workTime = 25;
      this.$parent.playTime = 5;
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

        // set current countdown time based on either work or break session
        deadline += this.working ? this.$parent.workTime * 60000 : this.$parent.playTime * 60000;

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
              this.timmerRunning = false;
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
      return time < 10 ? `0${time}` : time;
    },

  },

  mounted() {
    this.displayTime = `${this.formatTime(this.$parent.workTime)}:00`;
  },

  beforeDestroy() {
    clearInterval(this.countdown);
  },
};
</script>

<style lang="sass" scoped>

</style>
