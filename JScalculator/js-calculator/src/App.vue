<template>
  <div id="calculator">

    <div class="lcd">
      <!-- io shows the line above where the user is stringing their calculations -->
      <div id="io"></div>
      <!-- display shows the active input the user gives -->
      <div id="display"></div>
    </div>

    <div class="numpad">
      <button id="one" @click="number('1')" class="digit lightgrey" type="button" aria-label="1">
        1
      </button>
      <button id="two" @click="number('2')" class="digit lightgrey" type="button" aria-label="2">
        2
      </button>
      <button id="three" @click="number('3')" class="digit lightgrey" type="button" aria-label="3">
        3
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
      <button id="seven" @click="number('7')" class="digit lightgrey" type="button" aria-label="7">
        7
      </button>
      <button id="eight" @click="number('8')" class="digit lightgrey" type="button" aria-label="8">
        8
      </button>
      <button id="nine" @click="number('9')" class="digit lightgrey" type="button" aria-label="9">
        9
      </button>
      <button id="zero" @click="number('0')" class="digit lightgrey" type="button" aria-label="0">
        0
      </button>
    </div>

    <br>

    <div class="decimal">
      <button id="decimal" @click="decimal" class="decimal lightgrey" type="button"
              aria-label="decimal">
        .
      </button>
      <button @click="posNeg">
        <span style="vertical-align: super">+</span>
        &#47;
        <span style="vertical-align: sub">-</span>
      </button>
    </div>

    <br>

    <div class="operations">
      <button id="add" @click="operator('+')" class="operator darkgrey" type="button"
              aria-label="add">
        +
      </button>
      <button id="subtract" @click="operator('-')" class="operator darkgrey" type="button"
              aria-label="substract">
        -
      </button>
      <button id="multiply" @click="operator('*')" class="operator darkgrey" type="button"
              aria-label="multiply">
        x
      </button>
      <button id="divide" @click="operator('/')" class="operator darkgrey" type="button"
              aria-label="divide">
        &#247;
      </button>
    </div>

    <br>

    <div class="equals">
      <button id="equals" @click="equals" class="equals orange" type="button"
              aria-label="calculate">
        =
      </button>
    </div>

    <br>

    <div class="allClear">
      <button id="clear" @click="allClear" class="clearDisplay darkgrey" type="button"
              aria-label="clear display to 0">
        CD
      </button>
      <button id="clear-entry" @click="clearEntry" class="clear darkgrey" type="button"
              aria-label="clear entry">
        C
      </button>
    </div>

  </div>
</template>

<script>
import { evaluate } from 'mathjs';

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
        this.display = '';
        this.display += num;
      // put in another check to see if there's been a calulation, clear display and io, add num
      } else if (/=/.test(this.io)) {
        this.io = '';
        this.display = '';
        this.display += num;
        document.getElementById('io').innerText = this.io;
      // check if only digits are in the display, if so then add digits
      } else if (/\d/.test(this.display)) {
        this.display += num;
      // if there is an operator, put it in <io> and start new number input
      } else if (/(\+|-|\*|\/)/.test(this.display)) {
        this.io += ` ${this.display} `;
        document.getElementById('io').innerText = this.io;
        this.display = '';
        this.display += num;
      }

      document.getElementById('display').innerText = this.display;
    },

    operator(op) {
      if (/=/.test(this.io)) {
        this.io = '';
        this.io += this.display;
        this.display = op;
        document.getElementById('io').innerText = this.io;
        document.getElementById('display').innerText = op;
      } else if (/\d/.test(this.display)) {
        this.io += this.display;
        document.getElementById('io').innerText = this.io;
        this.display = op;
        document.getElementById('display').innerText = this.display;
      } else if (/\+|-\*|\/|/.test(this.display)) {
        if (op === '-') {
          this.display += op;
        } else {
          this.display = op;
        }
        document.getElementById('display').innerText = this.display;
      }
    },

    decimal() {
      // if no leading numbers, then decimal < 0
      if (/^0$/.test(this.display)) {
        this.display = '0.';
        document.getElementById('display').innerText = this.display;
      // if operator in <display>, add to io and begin new decimal number
      } else if (/(\+|-|\*|\/)/.test(this.display)) {
        this.io += ` ${this.display}`;
        document.getElementById('io').innerText = this.io;
        this.display = '0.';
        document.getElementById('display').innerText = this.display;
      // else add decimal
      } else if (/\d/.test(this.display) && !/\./.test(this.display)) {
        this.display += '.';
        document.getElementById('io').innerText = this.io;
        document.getElementById('display').innerText = this.display;
      }
      // do nothing, which prevents multiple decimals in same number
    },

    posNeg() {
      if (/^-/.test(this.display)) {
        this.display = this.display.substring(1);
        document.getElementById('display').innerText = this.display;
      } else if (/\d/.test(this.display)) {
        this.display = `-${this.display}`;
        document.getElementById('display').innerText = this.display;
      }
    },

    equals() {
      // pop whatever is currently in the display to io to prep for calculation
      this.io += this.display;
      // evaluate and display full calculation on <io> and result on <display>
      const answer = evaluate(this.io);
      this.io += ` = ${answer}`;
      document.getElementById('io').innerText = ` ${this.io}`;
      this.display = '';
      this.display = answer;
      document.getElementById('display').innerText = this.display;
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
body {
  margin: 0;
  padding: 0;
  background-color: darkgrey;
}

#calculator {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

#display {
  height: 3rem;
  color: white;
}

#io {
  color: white;
  height: 3rem;
  font-size: 0.8rem;
}
</style>
