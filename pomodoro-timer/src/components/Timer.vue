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
      // reset all attributes to default work time
      this.timeElapsed = 0;
      this.timmerRunning = false;
      this.displayTime = '25:00';
      this.sessionLabel = 'Time to work!';
      this.working = true;
    },

    startTimer() {
      // set current countdown time based on either work or break session
      const deadline = this.working ? (this.$parent.workTime * 60 * 1000)
        : (this.$parent.playTime * 60 * 1000);

      // we could add another button to manually set break or work session?
      this.sessionLabel = (this.working) ? 'Time to work!' : 'Take a break!';

      if (!this.timmerRunning) {
        this.timmerRunning = true;
        this.incrementTime(deadline);
      } else {
        this.timmerRunning = false;
      }
    },

    incrementTime(time) {
      if (this.timmerRunning) {
        this.timeInc = setTimeout(() => {
          // set to setTimeout() interval, in ms
          this.timeElapsed += 100;

          const interval = time - this.timeElapsed;
          const minutes = Math.floor(interval / (1000 * 60));
          const seconds = Math.floor((interval / 1000) % 60);


          this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

          // if current timer has ended, start next timer
          if (interval < 100) {
            clearTimeout(this.timeInc);
            this.timeElapsed = 0;
            this.timmerRunning = false;
            // switch from work to break session
            this.working = !this.working;
            this.startTimer();
          } else {
            // continue to call setTimeout() to measure time
            this.incrementTime(time);
          }
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

};
</script>

<style lang="sass" scoped>

</style>
