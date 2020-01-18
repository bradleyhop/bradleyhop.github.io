const gbDrums = [
  {
    desc   : 'arp',
    letter : 'Q',
    source : 'gbDrums/arp (2).mp3',
  },
  {
    desc   : 'sfx',
    letter : 'W',
    source : 'gbDrums/sfx (1).mp3',
  },
  {
    desc   : 'openhat',
    letter : 'E',
    source : 'gbDrums/openhat (1).mp3',
  },
  {
    desc   : 'snare 1',
    letter : 'A',
    source : 'gbDrums/snare (5).mp3',
  },
  {
    desc   : 'high hat 1',
    letter : 'S',
    source : 'gbDrums/hihat (1).mp3',
  },
  {
    desc   : 'high hat 2',
    letter : 'D',
    source : 'gbDrums/hihat (5).mp3',
  },
  {
    desc   : 'kick drum 1',
    letter : 'Z',
    source : 'gbDrums/kick (3).mp3',
  },
  {
    desc   : 'kick drum 2',
    letter : 'X',
    source : 'gbDrums/kick (7).mp3',
  },
  {
    desc   : 'snare 2',
    letter : 'C',
    source : 'gbDrums/snare (1).mp3'
  }
];

var DrumPads = Vue.extend({
  data () {
    return {
      drumpad: gbDrums
    };
  },
  template:
  `
  <div id="button-box">
    <div v-for="drum in drumpad">
      <button class="drum-pad" :id="drum.desc" @click="clickDrum(drum.letter)">
        <audio preload="auto" :src="drum.source" class="clip" :id="drum.letter"
          type="audio/mp3">
        </audio>
        {{ drum.letter }}
      </button>
    </div>
  </div>
  `,
  methods: {
    clickDrum(e) {
      this.$parent.hitDrum(e);
    }
  }
});

var dm = new Vue({
  el: "#drum-machine",
  components: {
    "drum-pads": DrumPads
  },
  methods: {
    hitDrum: (inst) => {
      inst = inst.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(inst) >= 0) {
        dm.playAudio(document.getElementById(inst));

        // using pure js to pass user story 8. since doing it via Vue
        //  doesn't register with the test script
        let discriptionDisplay = gbDrums.find( hit => hit.letter === inst );
        document.getElementById("display").innerText = discriptionDisplay.desc;
      }
    },
    playAudio: async (el) => {
      try {
        await el.play();
      }
      catch (err) {
        console.error("Playback error! " + err);
      }
    },
  },
  created () {
    window.addEventListener("keyup", (e) => this.hitDrum(e.key));
  },
  // not sure if needed since this is a SPA, but why nor prevent memory leaks?
  beforeDestroy() {
    window.removeEventListener("keyup", (e) => this.hitDrum(e.key));
  }
});
