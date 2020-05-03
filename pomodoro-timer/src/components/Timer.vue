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

    <div id="timer-label"></div>
    <div id="time-left"></div>
    <audio id="beep" preload="auto" class="clip" source="./assets/chime.mp3" type="audio/mp3">
    </audio>

  </div>
</template>

<script>
export default {
  name: 'Timer',

  data() {
    return {
      timmerRunning: false,
      timeElapsed: 0,
      working: true,
      timeInc: null, // placeholder for setTimeout()
      chime: new Audio('../assets/chime.mp3'),
    };
  },

  methods: {

    resetTimer() {
      // pause that gong and reset playback!
      this.chime.pause();
      this.chime.currentTime = 0;

      // reset all attributes to default work time
      clearTimeout(this.timeInc);
      this.timmerRunning = false;
      this.timeElapsed = 0;
      document.getElementById('time-left')
        .innerText = `${this.formatTime(this.$parent.workTime)}:00`;
      document.getElementById('timer-label')
        .innerText = 'Time to work!';
      this.working = true;

      // reset default time limits
      this.$parent.workTime = 25;
      this.$parent.playTime = 5;
    },

    startTimer() {
      // set current countdown time based on either work or break session
      const deadline = this.working ? (this.$parent.workTime * 60 * 1000)
        : (this.$parent.playTime * 60 * 1000);

      // we could add another button to manually set break or work session?
      document.getElementById('timer-label')
        .innerText = (this.working) ? 'Time to work!' : 'Take a break!';

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


          document.getElementById('time-left')
            .innerText = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

          // if current timer has ended, start next timer
          if (interval < 1) {
            // play audio at end of timer
            this.chime.play();

            clearTimeout(this.timeInc);
            this.timeElapsed = 0;
            this.timmerRunning = false;

            // switch from work to break session
            this.working = !this.working;

            // start new timer automatically
            this.startTimer();
          } else {
            // continue to call setTimeout() to measure time
            this.incrementTime(time);
          }
        }, 10);
      }
    },

    playAudio: async (el) => {
      const playObj = el;
      try {
        playObj.currentTime = 0;
        await playObj.play();
      } catch (err) {
        // eslint-disable-next-line
        console.error(`Playback error! ${err}`);
      }
    },

    formatTime(time) {
      // return number so that time is in a MM:SS format
      return time < 10 ? `0${time}` : time;
    },

  },

  mounted() {
    document.getElementById('timer-label')
      .innerText = 'Time to work!';
    document.getElementById('time-left')
      .innerText = `${this.formatTime(this.$parent.workTime)}:00`;
  },

};
</script>

<style lang="sass" scoped>

</style>
