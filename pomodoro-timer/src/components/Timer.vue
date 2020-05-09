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

    <div class="wrapperEndo">
      <img class="enso" src="../assets/Enso.svg" alt="image of zen enso">
    <div id="timer-label" class="titleCenter"></div>
    <div id="time-left" class="timerCenter"></div>
    <audio id="beep" src="../assets/chime.mp3" type=mpeg preload="auto"></audio>
    </div>

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
      workMessage: 'concentrate',
      playMessage: 'relax',
      timeInc: null, // placeholder for setTimeout()
    };
  },

  methods: {

    resetTimer() {
      // stop timer
      clearTimeout(this.timeInc);

      // pause that gong and reset playback!
      this.pauseAudio(document.getElementById('beep'));

      // reset default time limits first
      this.$parent.workTime = 25;
      document.getElementById('session-length').innerText = this.$parent.workTime;
      this.$parent.playTime = 5;
      document.getElementById('break-length').innerText = this.$parent.playTime;

      // reset all attributes to default work time
      this.timmerRunning = false;
      this.timeElapsed = 0;
      document.getElementById('time-left')
        .innerText = `${this.formatTime(this.$parent.workTime)}:00`;
      document.getElementById('timer-label')
        .innerText = this.workMessage;
      this.working = true;
    },

    startTimer() {
      // set current countdown time based on either work or break session
      const deadline = this.working ? (this.$parent.workTime * 60 * 1000)
        : (this.$parent.playTime * 60 * 1000);

      // switch message before next start timer call
      document.getElementById('timer-label')
        .innerText = this.working ? this.workMessage : this.playMessage;

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
          // NOTE: adding (1000 - setTimeout interva)l here so that the first second is counted
          const interval = time - this.timeElapsed + 900;
          const minutes = Math.floor(interval / (1000 * 60));
          const seconds = Math.floor((interval / 1000) % 60);

          document.getElementById('time-left')
            .innerText = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

          // if current timer has ended, start next timer
          if (document.getElementById('time-left').innerText === '00:00') {
            this.playAudio(document.getElementById('beep'));
            clearTimeout(this.timeInc);
            this.timeElapsed = 0;
            this.timmerRunning = false;
            this.working = !this.working;
            this.startTimer();
          } else {
            // continue to call setTimeout() to measure time
            this.incrementTime(time);
          }

          // set to setTimeout() interval, in ms
          this.timeElapsed += 100;
        }, 100);
      }
    },

    formatTime(time) {
      // return number so that time is in a MM:SS format
      return time < 10 ? `0${time}` : time;
    },

    playAudio: async (el) => {
      const playObj = el;
      try {
        await playObj.play();
      } catch (err) {
        // eslint-disable-next-line
        console.error(`Playback error! ${err}`);
      }
    },

    pauseAudio: async (el) => {
      const playObj = el;
      try {
        await playObj.pause();
        playObj.currentTime = 0;
      } catch (err) {
        // eslint-disable-next-line
        console.error(`Pause error! ${err}`);
      }
    },
  }, // end methods:


  mounted() {
    document.getElementById('timer-label')
      .innerText = this.workMessage;
    document.getElementById('time-left')
      .innerText = `${this.formatTime(this.$parent.workTime)}:00`;
  },

  beforeDestroy() {
    clearTimeout(this.timeInc);
  },

};
</script>

<style lang="scss" scoped>
.enso {
  position: relative;
  height: 24rem;
  text-align: center;
  width: 24rem;
}

.titleCenter {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.timerCenter {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
