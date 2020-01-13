var dm = new Vue({
  el: "#drum-machine",
  methods: {
    hitDrum: (inst) => {
      inst = inst.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(inst) >= 0) {
        dm.playAudio(document.getElementById(inst));

        // using pure js to pass user story 8. since doing it via Vue
        //  doesn't register with the test script
        document.getElementById("display").innerText = inst;
      }
    },
    playAudio: async (el) => {
      try {
        await el.play();
      }
      catch (err) {
        console.log("Playback error: " + err);
      }
    },
  },
  created: function () {
    window.addEventListener("keyup", (e) => this.hitDrum(e.key));
  },
  // not sure if needed since this is a SPA, but why nor prevent memory leaks?
  beforeDestroy() {
    window.removeEventListener("keyup", (e) => this.hitDrum(e.key));
  }
});
