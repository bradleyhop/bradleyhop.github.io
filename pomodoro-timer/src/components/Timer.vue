<template>


  <div id="timer">

    <div class="wrapperEnso">

      <img class="enso" src="../assets/Enso.svg" alt="image of zen enso">

      <div id="timer-label" class="titleCenter"></div>
      <div id="time-left" class="timerCenter"></div>
      <audio id="beep" src="../assets/chime.mp3" type=mpeg preload="auto"></audio>

      <div id="circle" class="progressCircle"></div>

      <div class="timerControls">
        <div class="startStopCenter">
          <button id="start_stop" class="faControls" title="play/pause"
                  @click="startPauseTimer" aria-label="start or pause timer">
            <font-awesome-icon :icon="['fas', 'play']" />
            <font-awesome-icon :icon="['fas', 'pause']" />
          </button>
        </div>
        <div class="resetCenter">
          <button id="reset" class="faControls" title="reset" @click="resetTimer"
                  aria-label="stop timer and reset to default values">
            <font-awesome-icon :icon="['fas', 'redo']" />
          </button>
        </div>
      </div>
    </div><!-- wrapperEnso -->


  </div>
</template>

<script>
import ProgressBar from 'progressbar.js';

export default {
  name: 'Timer',

  data() {
    return {
      timerRunning: false,
      timeElapsed: 0,
      working: true,
      workMessage: 'concentrate',
      playMessage: 'relax',
      timeInc: null, // placeholder for setTimeout()
      reveal: null, // placeholder for ProgressBar.Circle() functions
    };
  },

  methods: {

    startPauseTimer() {
      // set current countdown time based on either work or break session
      const deadline = this.working ? (this.$parent.workTime * 60 * 1000)
        : (this.$parent.playTime * 60 * 1000);

      // switch message before next start timer call
      document.getElementById('timer-label')
        .innerText = this.working ? this.workMessage : this.playMessage;

      if (!this.timerRunning) {
        // tell parent component that timer is running and so don't update timer on buttton press
        this.$parent.adjustable = false;
        this.timerRunning = true;
        // start painting progressbar
        this.paintCircle(deadline);
        // start timer
        this.incrementTime(deadline);
      } else {
        this.timerRunning = false;
        // stop drawing circle
        this.reveal.stop();
      }
    },

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
      this.$parent.adjustable = true; // allow timer to be set and displayed
      this.timerRunning = false;
      this.timeElapsed = 0;
      document.getElementById('time-left')
        .innerText = `${this.$parent.formatTime(this.$parent.workTime)}:00`;
      document.getElementById('timer-label')
        .innerText = this.workMessage;
      this.working = true;

      // remove circle animation
      this.reveal.destroy();
      this.reveal = null;
    },

    incrementTime(time) {
      if (this.timerRunning) {
        this.timeInc = setTimeout(() => {
          // NOTE: adding (1000 - setTimeout interval) here so that the first second is counted
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
            this.timerRunning = false;
            this.working = !this.working;
            // remove finished progress bar
            this.reveal.destroy();
            this.reveal = null;
            this.startPauseTimer();
          } else {
            // continue to call setTimeout() to measure time
            this.incrementTime(time);
          }

          // set to setTimeout() interval, in ms
          this.timeElapsed += 100;
        }, 100);
      }
    },

    paintCircle(time) {
      if (!this.reveal) {
        this.reveal = new ProgressBar.Circle('#circle', {
          strokeWidth: 6,
          easing: 'linear',
          duration: time,
          color: '#000',
          warnings: true,
        });
      }

      this.reveal.animate(1.0);
    },

    playAudio: async (el) => {
      const playObj = el;
      try {
        await playObj.play();
      } catch (err) {
        throw new Error(err);
      }
    },

    pauseAudio: async (el) => {
      const playObj = el;
      try {
        await playObj.pause();
        playObj.currentTime = 0;
      } catch (err) {
        throw new Error(err);
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

@mixin enso-big {
  height: 27rem;
  width: 27rem;
}

.wrapperEnso {
  position: relative;
}

.enso {
  text-align: center;
  width: 22rem;
  height: 22rem;

  @media only screen and (min-width: $responsive-width) {
    @include enso-big;
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

.faControls {
  font-size: 1.5rem;
}

.resetCenter {
  @include inset;
  top: 62%;

  @media only screen and (min-width: $responsive-width) {
    top: 68%;
  }
}

.progressCircle {
  @include inset;
  @include enso-big;
  top: 50%;
}
</style>
