<script>
import Timer from './components/Timer.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Timer,
    Footer,
  },

  data() {
    return {
      workTime: 25, // default time per project spec
      playTime: 5, // default time per project spec
      adjustable: true, // dis- & allow timer to be set and displayed when it is running
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

<template>
  <div id="app" role="main">
    <div class="content">
      <h1 class="pageTitle" title="aka 25 + 5 clock">POMODORO TIMER</h1>

      <div class="inputWrapper">
        <div id="session-label" class="labels">
          work timer
          <div class="inline">
            <button
              id="session-increment"
              class="faButton bRight"
              aria-label="increase session timer"
              @click="incSess"
            >
              <font-awesome-icon :icon="['fas', 'angle-up']" />
            </button>
            <span id="session-length" class="sessionNumber"></span>
            <button
              id="session-decrement"
              class="faButton bLeft"
              aria-label="decrease session timer"
              @click="decSess"
            >
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
          </div>
        </div>

        <div id="break-label" class="labels">
          break timer
          <div class="inline">
            <button
              id="break-increment"
              class="faButton bRight"
              aria-label="increase break timer"
              @click="incBreak"
            >
              <font-awesome-icon :icon="['fas', 'angle-up']" />
            </button>
            <span id="break-length" class="sessionNumber"></span>
            <button
              id="break-decrement"
              class="faButton bLeft"
              aria-label="decrease break timer"
              @click="decBreak"
            >
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </button>
          </div>
        </div>
      </div>
      <!-- inputWrapper -->

      <Timer />

      <div class="tagline">
        <a
          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>Need information about the pomodoro technique?</i>
        </a>
      </div>
    </div>
    <!-- .content -->

    <footer>
      <Footer />
    </footer>
  </div>
  <!-- main -->
</template>

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

* {
  box-sizing: border-box;
  margin: 0;

  &::before {
    box-sizing: border-box;
  }

  &::after {
    box-sizing: border-box;
  }
}

html {
  background-color: #595959;
}

#app {
  color: #fff;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-size: 16px;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100dvh;
  min-height: 100vh;
  flex-wrap: wrap;
}

.content {
  flex: 1 0 auto; // grow main page space to the content
}

footer {
  flex-shrink: 0;
}

.pageTitle {
  font-size: 3rem;
  letter-spacing: -0.5px;
  margin: 0.5rem 0 0.5rem 0;
}

.inputWrapper {
  align-content: space-around;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
}

.labels {
  letter-spacing: -0.5px;
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
  // set position and z-index so that the progress circle doesn't obstruct functionality
  z-index: 999999;

  &:active {
    color: #000;
  }
}

.faButton {
  font-size: 2rem;
  margin: 0 0.5rem;
}

.sessionNumber {
  font-size: 1.25rem;
  width: 2rem;
}

.tagline {
  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}

.aboveCircle {
  margin: 1rem 0.25rem 0 0.25rem;
  // set position and z-index so that the progress circle doesn't obstruct functionality
  position: relative;
  z-index: 999999;

  a {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}
</style>
