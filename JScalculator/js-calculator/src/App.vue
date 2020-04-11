<template>
  <div id="calculator">

    <div class="lcd">
      <div id="display"></div>
      <div id="io"></div>
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
      <button @click="decimal" class="decimal lightgrey" type="button" aria-label=".">.</button>
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
      } else {
        this.display += num;
      }

      document.getElementById('display').innerText = this.display;
    },

    allClear() {
      this.display = '0';
      this.io = '';

      document.getElementById('display').innerText = this.display;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
