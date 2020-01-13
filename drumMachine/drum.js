var dm = new Vue({
  el: "#drum-machine",
  data: {
    whatDrum:  ""
  },
  methods: {
    hitDrum: function (inst) {
      inst = inst.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(inst) >= 0) {
        console.log( "you hit the: " + inst);
      }
    }
  },
  created: function () {
    let vm = this;
    window.addEventListener("keyup", function(event) {
      vm.hitDrum(event.key);
    });
  },
});
