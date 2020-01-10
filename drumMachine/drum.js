var dm = new Vue({
  el: "#drum-machine",
  created: {
    function () {
      window.addEventListener('keyup', this.hitDrum);
    }
  },
  methods: {
    hitDrum: function (inst) {
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(inst) >= 0) {
        console.log("you hit the: " + inst);
      }
    }
  },
});
