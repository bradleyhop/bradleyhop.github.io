<template>
  <div id="calculator">

    <div class="lcd">
      <!-- io shows the line above where the user is stringing their calculations -->
      <div id="io"></div>
      <!-- display shows the active input the user gives -->
      <div id="display"></div>
    </div>

    <div class="numpad">
      <button @click="number('1')" class="digit lightgrey" type="button" aria-label="1">1</button>
      <button @click="number('2')" class="digit lightgrey" type="button" aria-label="2">2</button>
      <button @click="number('3')" class="digit lightgrey" type="button" aria-label="3">3</button>
      <button @click="number('4')" class="digit lightgrey" type="button" aria-label="4">4</button>
      <button @click="number('5')" class="digit lightgrey" type="button" aria-label="5">5</button>
      <button @click="number('6')" class="digit lightgrey" type="button" aria-label="6">6</button>
      <button @click="number('7')" class="digit lightgrey" type="button" aria-label="7">7</button>
      <button @click="number('8')" class="digit lightgrey" type="button" aria-label="8">8</button>
      <button @click="number('9')" class="digit lightgrey" type="button" aria-label="9">9</button>
      <button @click="number('0')" class="digit lightgrey" type="button" aria-label="0">0</button>
    </div>

    <br>

    <div class="decimal">
      <button @click="decimal" class="decimal lightgrey" type="button" aria-label="decimal">
        .
      </button>
      <!--<button @click="posNeg">+ &#47; -</button>-->
    </div>

    <br>

    <div class="operations">
      <button @click="operator('+')" class="operator darkgrey" type="button" aria-label="add">
        +
      </button>
      <button @click="operator('-')" class="operator darkgrey" type="button" aria-label="substract">
        -
      </button>
      <button @click="operator('*')" class="operator darkgrey" type="button" aria-label="multiply">
        x
      </button>
      <button @click="operator('/')" class="operator darkgrey" type="button" aria-label="divide">
        &#247;
      </button>
    </div>

    <br>

    <div class="equals">
      <button @click="equals" class="equals orange" type="button" aria-label="calculate">
        =
      </button>
    </div>

    <br>

    <div class="allClear">
      <button @click="allClear" class="clearDisplay darkgrey" type="button"
              aria-label="clear display to 0">
        CD
      </button>
      <button @click="clearEntry" class="clear darkgrey" type="button" aria-label="clear entry">
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
        this.io += num;
        this.display += num;
        document.getElementById('io').innerText = this.io;
      } else if (/\d/.test(this.display)) {
        this.display += num;
      } else if (/(\+|-|\*|\/)/.test(this.display)) {
        this.io += ` ${this.display} `;
        document.getElementById('io').innerText = this.io;
        this.display = '';
        this.display += num;
      }

      document.getElementById('display').innerText = this.display;
    },

    operator(op) {
      // only activate operator if there are numbers in the display and also if not just 0
      if (/\d/.test(this.display) && !/^0$/.test(this.display) && !/=/.test(this.io)) {
        this.io += this.display;
        this.display = '';
        this.display += op;
        document.getElementById('io').innerText = this.io;
        document.getElementById('display').innerText = op;
      // check for prior calulation
      } else if (/=/.test(this.io)) {
        this.io = '';
        this.io += this.display;
        this.display = op;
        document.getElementById('io').innerText = this.io;
        document.getElementById('display').innerText = op;
      }
      // else ignore other operator button presses
    },

    equals() {
      // pop whatever is currently in the display to io to prep for calculation
      this.io += this.display;

      // evaluate and display full calculation on <io> and result on <display>
      const answer = evaluate(this.io);
      this.io += ` = ${answer}`;
      document.getElementById('io').innerText = `${this.io}`;
      this.display = '';
      this.display = answer;
      document.getElementById('display').innerText = this.display;
    },

    allClear() {
      // clear out both the active display and th io line
      this.display = '0';
      this.io = '';

      document.getElementById('display').innerText = this.display;
      document.getElementById('io').innerText = this.io;
    },

    clearEntry() {
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
