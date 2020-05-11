<template>
  <div id="app" role="main">
    <h1 class="pageTitle">pomodoro timer</h1>

    <div class="inputWrapper">

      <div id="session-label" class="labels">
        Work Timer
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
        Break Timer
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
      if (this.workTime > 1) {
        this.workTime -= 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    incSess() {
      if (this.workTime < 60) {
        this.workTime += 1;
        document.getElementById('session-length').innerText = this.workTime;
      }
    },
    decBreak() {
      if (this.playTime > 1) {
        this.playTime -= 1;
        document.getElementById('break-length').innerText = this.playTime;
      }
    },
    incBreak() {
      if (this.playTime < 60) {
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
      // only display use updates to timer session if there isn't a timer running currently
      if (this.adjustable) {
        // update child component timer display to reflect when user changes session length
        document.getElementById('time-left').innerText = `${this.formatTime(this.workTime)}:00`;
      }
    },
  },

};
</script>

<style lang="scss">
// min-width for mobile-first dessign
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
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.inputWrapper {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: center;
  width: 100%;
  margin: auto;

  @media only screen and (min-width: $responsive-width) {
    width: 50%;
  }
}

.labels {
  margin: 0.5rem;
  padding: 0.5rem;

  @media only screen and (min-width: $responsive-width) {
    font-size: 1.5rem;
  }
}

.inline {
  width: 100%;
}

button {
  border: 0;
  background: none;
  color: #fff;

  &:active {
    color: #000;
  }
}

.faButton {
  font-size: 1.5rem;
  margin: 0 0.5rem;
}

.bRight {
  float: right;
}

.bLeft {
  float: left;
}

.sessionNumber {
  font-size: 1.25rem;
}

</style>
