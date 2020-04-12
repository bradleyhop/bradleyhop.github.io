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
      <button @click="operator('x')" class="operator darkgrey" type="button" aria-label="multiply">
        x
      </button>
      <button @click="operator('/')" class="operator darkgrey" type="button" aria-label="divide">
        &#247;
      </button>
    </div>

    <br>

    <div class="equals">
      <button @click="equals" class="equals orange" type="button" aria-label="calculate">=</button>
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
      } else if (/(\+|-|x|\/)/.test(this.display)) {
        if (num !== '0') {
          this.display += num;
        }
      } else {
        this.display += num;
      }

      document.getElementById('display').innerText = this.display;
    },

    operator(op) {
      // Throw whatever is in the active display to the io line above, clear display, and show
      //   perator.
      if (this.io !== '') {
        this.io = this.display;
      } else {
        this.io += this.display;
      }
      this.display = '';
      this.display = op;

      document.getElementById('io').innerText = this.io;
      document.getElementById('display').innerText = '';
      document.getElementById('display').innerText = op;
    },

    allClear() {
      // clear out both the active display and th io line
      this.$data.display = '0';
      this.$data.io = '';

      document.getElementById('display').innerText = this.$data.display;
      document.getElementById('io').innerText = this.$data.io;
    },
  },

  mounted() {
    document.getElementById('display').innerText = this.display;
  },

  created() {
    // listen for keypress and assign call method for that keypress
    window.addEventListener('keyup', (e) => this.dosomething(e));
  },

  beforeDestroy() {
    window.removeEventListener('keyup', (e) => this.dosomething(e));
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
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
  font-size: 0.75rem;
}
</style>
