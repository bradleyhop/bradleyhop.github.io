<template>
  <div id="calculator">

    <div class="lcd">
      <!-- io shows the line above where the user is stringing their calculations -->
      <div id="io"></div>
      <!-- display shows the active input the user gives -->
      <div id="display"></div>
    </div>

    <div class="button-container">
      <button id="inverse" @click="inverse" class="inverse darkgrey" type="button"
              aria-label="compute inverse">
        1 &#47; x
      </button>
      <button id="square" @click="square" class="square darkgrey" type="button"
              aria-label="compute square">
        x<span style="vertical-align: super; font-size: 0.8rem;">2</span>
      </button>
      <button id="sqareRoot" @click="squareRoot" class="sqareRoot darkgrey" type="button"
              aria-label="compute square root">
        &#8730;x
      </button>
      <button id="posNeg" @click="posNeg" class="darkgrey">
        + &#47; -
      </button>

      <button id="clear" @click="allClear" class="clearDisplay lightgrey doublewide" type="button"
              aria-label="clear display to 0">
        CD
      </button>
      <button id="clear-entry" @click="clearEntry" class="clear darkgrey" type="button"
              aria-label="clear entry">
        C
      </button>
      <button id="divide" @click="operator('/')" class="operator darkgrey" type="button"
              aria-label="divide">
        &#247;
      </button>

      <button id="seven" @click="number('7')" class="digit lightgrey" type="button" aria-label="7">
        7
      </button>
      <button id="eight" @click="number('8')" class="digit lightgrey" type="button" aria-label="8">
        8
      </button>
      <button id="nine" @click="number('9')" class="digit lightgrey" type="button" aria-label="9">
        9
      </button>
      <button id="multiply" @click="operator('*')" class="operator darkgrey" type="button"
              aria-label="multiply">
        x
      </button>


      <button id="four" @click="number('4')" class="digit lightgrey" type="button" aria-label="4">
        4
      </button>
      <button id="five" @click="number('5')" class="digit lightgrey" type="button" aria-label="5">
        5
      </button>
      <button id="six" @click="number('6')" class="digit lightgrey" type="button" aria-label="6">
        6
      </button>
      <button id="subtract" @click="operator('-')" class="operator darkgrey" type="button"
              aria-label="substract">
        -
      </button>

      <button id="one" @click="number('1')" class="digit lightgrey" type="button" aria-label="1">
        1
      </button>
      <button id="two" @click="number('2')" class="digit lightgrey" type="button" aria-label="2">
        2
      </button>
      <button id="three" @click="number('3')" class="digit lightgrey" type="button" aria-label="3">
        3
      </button>
      <button id="add" @click="operator('+')" class="operator darkgrey" type="button"
              aria-label="add">
        +
      </button>


      <button id="zero" @click="number('0')" class="digit lightgrey" type="button" aria-label="0">
        0
      </button>
      <button id="decimal" @click="decimal" class="decimal lightgrey" type="button"
              aria-label="decimal">
        .
      </button>
      <button id="equals" @click="equals" class="equals orange doublewide" type="button"
              aria-label="calculate">
        =
      </button>
    </div><!-- button-container -->

  </div>
</template>

<script>
import {
  evaluate, inv, square, sqrt, format,
} from 'mathjs';

// imported format() takes a number as the first arg, precision as the second
const precision = 7;

export default {
  name: 'App',

  data() {
    return {
      display: '0',
      io: '',
    };
  },

  methods: {
    number(num) {
      // no leading '0'
      if (this.display === '0') {
        this.display = num;
      // put in another check to see if there's been a calulation, clear display and io, add num
      } else if (/=/.test(this.io)) {
        this.io = '';
        this.display = num;
        document.getElementById('io').innerText = this.io;
      // check if only digits are in the display, if so then add digits
      } else if (/\d/.test(this.display)) {
        this.display += num;
      // if there is an operator, put it in <io> and start new number input
      } else if (/\+|-|\*|\//.test(this.display)) {
        this.io += ` ${this.display} `;
        document.getElementById('io').innerText = this.io;
        this.display = num;
      }

      document.getElementById('display').innerText = this.display;
    },

    operator(op) {
      // see if there's a previous calulation
      if (/=/.test(this.io)) {
        this.io = this.display;
        this.display = op;
        document.getElementById('io').innerText = this.io;
        document.getElementById('display').innerText = op;
      // only numbers
      } else if (/\d/.test(this.display)) {
        this.io += this.display;
        document.getElementById('io').innerText = this.io;
        this.display = op;
        document.getElementById('display').innerText = this.display;
      // NOTE: allow minus to be used as a negative sign, so append
      } else if (op === '-' && this.display.length < 2) {
        this.display += op;
        document.getElementById('display').innerText = this.display;
      // only two operators can be present
      } else if (this.display.length === 2) {
        this.display = op;
        document.getElementById('display').innerText = this.display;
      // replace display with single operator
      } else {
        this.display = op;
        document.getElementById('display').innerText = this.display;
      }
    },

    decimal() {
      if (/\d/.test(this.display)) {
        // if no leading numbers, then decimal < 0
        if (/^0$/.test(this.display)) {
          this.display = '0.';
          document.getElementById('display').innerText = this.display;
        // else add decimal
        } else if (/\d/.test(this.display) && !/\./.test(this.display)) {
          this.display += '.';
          document.getElementById('io').innerText = this.io;
          document.getElementById('display').innerText = this.display;
        }
      } else if (/(\+|-|\*|\/)/.test(this.display)) {
        // if operator in <display>, add to io and begin new decimal number
        this.io += ` ${this.display}`;
        document.getElementById('io').innerText = this.io;
        this.display = '0.';
        document.getElementById('display').innerText = this.display;
      }
      // do nothing to prevent multiple decimals in same number
    },

    posNeg() {
      if (/\d/.test(this.display)) {
        if (/^-/.test(this.display)) {
          this.display = this.display.substring(1);
          document.getElementById('display').innerText = this.display;
        } else if (/\d/.test(this.display)) {
          this.display = `-${this.display}`;
          document.getElementById('display').innerText = this.display;
        }
      }
    },

    inverse() {
      if (/\d/.test(this.display) && !/^0$/.test(this.display)) {
        this.display = format(inv(this.display), precision);
        document.getElementById('display').innerText = this.display;
      }
    },

    square() {
      if (/\d/.test(this.display) && !/^0$/.test(this.display)) {
        this.display = format(square(this.display), precision);
        document.getElementById('display').innerText = this.display;
      }
    },

    squareRoot() {
      if (/\d/.test(this.display) && !/^0$/.test(this.display)) {
        this.display = format(sqrt(this.display), precision);
        document.getElementById('display').innerText = this.display;
      }
    },

    equals() {
      if (/\d/.test(this.display)) {
        // pop whatever is currently in the display to io to prep for calculation
        this.io += this.display;
        // evaluate and display full calculation on <io> and result on <display>
        const answer = format(evaluate(this.io), precision);
        this.io += ` = ${answer}`;
        document.getElementById('io').innerText = ` ${this.io}`;
        // format(number, precision)
        this.display = answer;
        document.getElementById('display').innerText = this.display;
      }
    },

    allClear() {
      // clear out both the active <display> and the <io> line
      this.display = '0';
      this.io = '';

      document.getElementById('display').innerText = this.display;
      document.getElementById('io').innerText = this.io;
    },

    clearEntry() {
      // clear out and place a 0 in the active display
      this.display = '0';
      document.getElementById('display').innerHTML = this.display;
    },

  },

  mounted() {
    document.getElementById('display').innerText = this.display;
  },
};
</script>

<style lang="scss">
$lcd-red: #f0466b;

html {
  margin: 0;
  padding: 0;
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  background-color: #e9ebdd;
}

#calculator {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

.lcd {
  margin: auto;
  background-color: #000;
  width: 20rem;
}

#display {
  height: 3rem;
  color: $lcd-red;
  text-shadow: $lcd-red 1px -1px 14px;
}

#io {
  color: $lcd-red;
  text-shadow: $lcd-red 1px 0 14px;
  height: 3rem;
  font-size: 0.8rem;
}

button {
  width: 4rem;
  height: 4rem;
  font-weight: bold;
  border-radius: 5px;
  padding-inline: 0;
  border: none ;
  margin: 4px;
}

.button-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 18rem;
  justify-content: center;
}

.doublewide {
  width: 8rem;
}

.lightgrey {
  background-color: #f8f8f8;
}

.darkgrey {
  background-color: #c8cccb;
}

.orange {
  background-color: #fdb94c;
}
</style>
