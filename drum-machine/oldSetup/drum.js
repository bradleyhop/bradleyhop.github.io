const gbDrums = [
  {
    desc   : 'ARP',
    letter : 'Q',
    source : 'gbDrums/arp (2).mp3',
  },
  {
    desc   : 'SFX',
    letter : 'W',
    source : 'gbDrums/sfx (1).mp3',
  },
  {
    desc   : 'OPENHAT',
    letter : 'E',
    source : 'gbDrums/openhat (1).mp3',
  },
  {
    desc   : 'SNARE 1',
    letter : 'A',
    source : 'gbDrums/snare (5).mp3',
  },
  {
    desc   : 'HIGH HAT 1',
    letter : 'S',
    source : 'gbDrums/hihat (1).mp3',
  },
  {
    desc   : 'HIGH HAT 2',
    letter : 'D',
    source : 'gbDrums/hihat (5).mp3',
  },
  {
    desc   : 'KICK DRUM 1',
    letter : 'Z',
    source : 'gbDrums/kick (3).mp3',
  },
  {
    desc   : 'KICK DRUM 2',
    letter : 'X',
    source : 'gbDrums/kick (7).mp3',
  },
  {
    desc   : 'SNARE 2',
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
    hitDrum (inst) {
      inst = inst.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(inst) >= 0) {
        this.playAudio(document.getElementById(inst));
        this.styleDrumHit(inst);
      }
    },
    styleDrumHit (styleHit)  {
      let discriptionDisplay = gbDrums.find( hit => hit.letter === styleHit );
      discriptionDisplay = discriptionDisplay.desc;

      document.getElementById(discriptionDisplay)
        .classList.add("pressed-drum-pad");
      setTimeout( () =>
        document.getElementById(discriptionDisplay)
        .classList.remove("pressed-drum-pad"), 150 );

      // Using pure js to pass user story 8 since doing it via Vue
      //  doesn't register with the test script
      document.getElementById("display").innerText = discriptionDisplay;
    },
    playAudio: async (el) => {
      try {
        // reduces perceived latency playback on button press/function call
        el.currentTime = 0;
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
  // not sure if needed since this is a SPA, but why not prevent memory leaks?
  beforeDestroy() {
    window.removeEventListener("keyup", (e) => this.hitDrum(e.key));
  }
});
