<template>
  <div id="timer">

    <div class="wrapperEnso">

      <img class="enso" src="../assets/Enso.svg" alt="image of zen enso">

      <div id="timer-label" class="titleCenter"></div>
      <div id="time-left" class="timerCenter"></div>
      <audio id="beep" src="../assets/chime.mp3" type=mpeg preload="auto"></audio>

      <div class="timerControls">
        <div class="startStopCenter">
          <button id="start_stop" @click="startTimer" aria-label="start or pause timer">
            <font-awesome-icon :icon="['fas', 'play']" />
            <font-awesome-icon :icon="['fas', 'pause']" />
          </button>
        </div>
        <div class="resetCenter">
          <button id="reset" @click="resetTimer"
                  aria-label="stop timer and reset to default values">
            <font-awesome-icon :icon="['fas', 'redo']" />
          </button>
        </div>
      </div>
    </div><!-- wrapperEnso -->

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
        .innerText = `${this.$parent.formatTime(this.$parent.workTime)}:00`;
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
            .innerText = `${this.$parent.formatTime(minutes)}:${this.$parent.formatTime(seconds)}`;

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
      .innerText = `${this.$parent.formatTime(this.$parent.workTime)}:00`;
  },

  beforeDestroy() {
    clearTimeout(this.timeInc);
  },

};
</script>

<style lang="scss">
$responsive-width: 599px;

@mixin inset {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wrapperEnso {
  position: relative;
}

.enso {
  text-align: center;
  width: 22rem;
  height: 22rem;

  @media only screen and (min-width: $responsive-width) {
    height: 24rem;
    width: 24rem;
  }
}

.titleCenter {
  @include inset;
  font-weight: bold;
  font-size: 1.5rem;
  top: 38%;

  @media only screen and (min-width: $responsive-width) {
    font-size: 2rem;
    top: 42%;
  }
}

.timerCenter {
  @include inset;
  font-weight: bold;
  font-size: 1.5rem;
  top: 45%;

  @media only screen and (min-width: $responsive-width) {
    font-size: 2rem;
    top: 50%;
  }
}

.startStopCenter {
  @include inset;
  top: 55%;

  @media only screen and (min-width: $responsive-width) {
    top: 61%;
  }
}

.resetCenter {
  @include inset;
  top: 62%;

  @media only screen and (min-width: $responsive-width) {
    top: 68%;
  }
}
</style>
