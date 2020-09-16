<script>
export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      latitude: undefined,
      longitude: undefined,
      locale: '',
      description: '', // current weather condition
      temp: undefined, // in Celcius
      tempScale: 'C', // either C or F, set to C since that is what is returned
      icon: '',
      timeOfDay: 'night', // 'day' or 'night' setting for icons
    };
  },

  methods: {
    getLocation() {
      // gets called after created lifecylce step and after user agrees to give location
      const fccWeatherApi =
        `https://fcc-weather-api.glitch.me/api/current?lat=${this.latitude}&lon=${this.longitude}`;

      fetch(fccWeatherApi)
        .then((response) => {
          // check if we get a successful http request response
          if (!(response.status >= 200 && response.status < 300)) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
          } else {
            // parse json to object
            return response.json();
          }
        })
        .then((json) => {
          console.log(json);
          const now = new Date().getTime();

          this.locale = json.name.toUpperCase();
          this.description = json.weather[0].description.toUpperCase();
          // temperature scale is in C, so call convertTemp immediately
          this.temp = json.main.temp;
          this.convertTemp();
          // determine if day or night for icons, then call showIcon() to set
          if (now > json.sys.sunrise && now < json.sys.sunset) {
            this.timeOfDay = 'day';
          }
          this.showIcon(json.weather[0].main);
        })
        .catch((error) => {
          console.log('request failed', error);
        });
    },

    convertTemp() {
      // called when .temp is clicked
      if (this.tempScale === 'F') {
        this.tempScale = 'C';
        this.temp = Math.round((((this.temp - 32) * 5) / 9));
      } else {
        this.tempScale = 'F';
        this.temp = Math.round(((this.temp * 9) / 5 + 32));
      }
    },

    showIcon(main) {
      // weather condition values at https://openweathermap.org/weather-conditions
      const weatherIcon = {
        day: {
          Thunderstorm: 'wi-day-thunderstorm',
          Drizzle: 'wi-day-showers',
          Rain: 'wi-day-rain',
          Snow: 'wi-day-snow',
          Clear: 'wi-day-sunny',
          Clouds: 'wi-day-cloudy',
          Haze: 'wi-day-haze',
          Fog: 'wi-day-fog',
          Mist: 'wi-day-sprinkle',
          Smoke: 'wi-smoke',
          Sand: 'wi-sandstorm',
          Dust: 'wi-dust',
          Ash: 'wi-volcano',
          Squall: 'wind',
          Tornado: 'wi-tornado',
        },
        night: {
          Thunderstorm: 'wi-night-alt-thunderstorm',
          Drizzle: 'wi-night-alt-showers',
          Rain: 'wi-night-alt-rain',
          Snow: 'wi-night-alt-snow',
          Mist: 'wi-night-alt-sprinkle',
          Haze: 'wi-night-alt-haze',
          Fog: 'wi-night-alt-fog',
          Sand: 'wi-sandstorm',
          Tornado: 'wi-tornado',
          Clear: 'wi-night-clear',
          Clouds: 'wi-night-alt-cloudy',
          Smoke: 'wi-smoke',
          Dust: 'wi-dust',
          Ash: 'wi-volcano',
          Squall: 'wind',
        },
      };

      // must have .wi for weather-icons to work!!
      // 'na' if no icon for weather given
      this.icon = `wi ${weatherIcon[this.timeOfDay][main] || 'na'}`;
    },

  }, // end methods()

  created() {
    if (navigator.geolocation) {
      // add error checking here
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude.toFixed(4);
        this.longitude = position.coords.longitude.toFixed(4);
        // start getting json data
        this.getLocation();
      });
    }
  },

};
</script>

<template>
  <div id="app">
    <div
      v-if="!locale"
      class="loading"
    >
      Loading...
    </div>
    <div v-else-if="locale">
      <div class="description">{{ description }}</div>
      <div class="locale">{{ locale }}</div>
      <div @click="convertTemp" class="temperature">{{ temp }}&deg;{{ tempScale }}</div>
      <i :class="icon"></i>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #616161;
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  margin-top: 4rem;
  text-align: center;
}

.loading {
  color: #b3e5fc;
  font-size: 2rem;
}

.description {
  color: #d1c4e9;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.locale {
  color: #b3e5fc;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.temperature {
  color: #b3e5fc;
  cursor: pointer;
  font-size: 7rem;
  margin-bottom: 1rem;
}

.wi {
  color: #fff;
  font-size: 8rem;
}

.error {
  color: #ef5350;
  font-size: 2rem;
}
</style>
