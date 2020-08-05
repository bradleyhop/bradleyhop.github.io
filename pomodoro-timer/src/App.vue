<template>
  <div id="app" role="main">
    <h1 class="pageTitle">POMODORO TIMER</h1>

    <div class="inputWrapper">

      <div id="session-label" class="labels">
        work timer
        <div class="inline">
          <button id="session-increment" class="faButton bRight"
                  @click="incSess" aria-label="increase session timer">
            <font-awesome-icon :icon="['fas', 'angle-up']" />
          </button>
          <span id="session-length" class="sessionNumber"></span>
          <button id="session-decrement" class="faButton bLeft"
                  @click="decSess" aria-label="decrease session timer">
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </button>
        </div>
      </div>

      <div id="break-label" class="labels">
        break timer
        <div class="inline">
          <button id="break-increment" class="faButton bRight"
                  @click="incBreak" aria-label="increase break timer">
            <font-awesome-icon :icon="['fas', 'angle-up']" />
          </button>
          <span id="break-length" class="sessionNumber"></span>
          <button id="break-decrement" class="faButton bLeft"
                  @click="decBreak" aria-label="decrease break timer">
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </button>
        </div>
      </div>

    </div><!-- inputWrapper -->

    <Timer />

    <div class="tagline">
      <p class="aboveCircle">
        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">
          Need information about the pomodoro technique?
        </a>
      </p>
      <a href="https://bradleyhop.github.io" target="_blank">
        bradley smith
      </a>
      &#169; 2020
      <p>
        <a href="https://github.com/bradleyhop/bradleyhop.github.io/tree/master/pomodoro-timer"
           target="blank">
          Source code for this app on github
        </a>
      </p>
    </div><!-- tagline -->
  </div>
</template>

<script>
import Timer from './components/Timer.vue';

export default {
  name: 'App',

  components: {
    Timer,
  },

  data() {
    return {
      workTime: 25,
      playTime: 5,
      adjustable: true, // dis/allow timer to be set and displayed when it is running
    };
  },

  methods: {
    decSess() {
      if (this.workTime > 1 && this.adjustable) {
        this.workTime -= 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    incSess() {
      if (this.workTime < 60 && this.adjustable) {
        this.workTime += 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    decBreak() {
      if (this.playTime > 1 && this.adjustable) {
        this.playTime -= 1;
        document.getElementById('break-length').innerText = this.playTime;
      }
    },
    incBreak() {
      if (this.playTime < 60 && this.adjustable) {
        this.playTime += 1;
        document.getElementById('break-length').innerText = this.playTime;
      }
    },

    formatTime(time) {
      // return number so that time is in a MM:SS format
      return time < 10 ? `0${time}` : time;
    },
  },

  mounted() {
    document.getElementById('session-length').innerText = this.workTime;
    document.getElementById('break-length').innerText = this.playTime;
  },

  watch: {
    workTime() {
      // update child component timer display to reflect when user changes session length
      document.getElementById('time-left').innerText = `${this.formatTime(this.workTime)}:00`;
    },
  },

};
</script>

<style lang="scss">
// min-width for mobile-first design
$responsive-width: 599px;

// next four rules needed for the focus-visible polyfill; gives focus on keyboard navigation only
::-moz-focus-inner {
  border: 0;
}

:focus {
  outline: none;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

.focus-visible {
  border: #fff dotted 0.1rem;
}
// end focus-visible polyfill rules

html {
  background-color: #595959;
}

body {
  color: #fff;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.pageTitle {
  margin-bottom: 0.5rem;
}

.inputWrapper {
  align-content: space-around;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
}

.labels {
  margin: 0.5rem;
  padding: 0.5rem;

  @media only screen and (min-width: $responsive-width) {
    font-size: 1.5rem;
  }
}

.inline {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

button {
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  // div for progress circle obscures the funcionality, so set it above
  z-index: 999999;

  &:active {
    color: #000;
  }
}

.faButton {
  font-size: 1.5rem;
  margin: 0 0.5rem;
}

.sessionNumber {
  font-size: 1.25rem;
}

.tagline {
  a {
    color: white;
  }

  a:hover {
    color: black;
  }
}

.aboveCircle {
  // set position and z-index so that the progress circle doesn't obstruct functionality
  position: relative;
  z-index: 999999;
}

</style>
