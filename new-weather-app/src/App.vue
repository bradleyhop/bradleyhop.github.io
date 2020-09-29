<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },

  data() {
    return {
      latitude: undefined,
      longitude: undefined,
      locale: '',
      description: '', // current weather condition
      temp: undefined, // in Celcius
      tempScale: 'C', // either C or F, set to C since that is what is returned
      icon: '', // weather-icons to display
      timeOfDay: '', // 'day' or 'night' setting for icons
      errorMessage: '', // placeholder for any error messages to user
    };
  },

  methods: {
    getWeather() {
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
            return response.json();
          }
        })
        .then((json) => {
          // console.log(json);
          if (json.name === 'Shuzenji') {
            /*
             * Sometimes the data returned will give the location of a small town in Japan.
             * This is almost never the case, so prompting user to reload page is the best we can do
             *   here. Getting that location must be a quirk of the pass-through api we're using.
             */
            this.errorMessage = 'Data return error. Please reload page to get weather conditions.';
          } else {
            // get time at call, but convert to seconds b/c that's what we get in the json data
            const now = (new Date().getTime()) / 1000;

            this.locale = json.name.toUpperCase();
            this.description = json.weather[0].description.toUpperCase();
            // temperature scale is in C, so call convertTemp immediately 'cause 'merica
            this.temp = json.main.temp;
            this.convertTemp();
            // determine if day or night for icons, then call showIcon() to set
            if (json.sys.sunrise < now && now < json.sys.sunset) {
              this.timeOfDay = 'day';
            }
            this.showIcon(json.weather[0].main);
          }
        })
        .catch((error) => {
          this.errorMessage = `Error in getting data: ${error}. Please reload page to try again.`;
        });
    },

    convertTemp() {
      // called when class="temp" is clicked
      if (this.tempScale === 'F') {
        this.tempScale = 'C';
        this.temp = Math.round((((this.temp - 32) * 5) / 9));
      } else {
        this.tempScale = 'F';
        this.temp = Math.round(((this.temp * 9) / 5 + 32));
      }
    },

    showIcon(main) {
      // called by getWeather() after reading json data
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
          Haze: 'wi-day-haze',
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

      // ihis.icon is a reactive class; must have .wi for weather-icons to work!!
      // 'na' if no icon is available for weather given
      this.icon = `wi ${weatherIcon[this.timeOfDay][main] || 'na'}`;
    },

    reloadPage() {
      // on error, let user reload page to try again
       window.location.reload();
    },

  }, // end methods()

  created() {
    // solely relies on user allowing access to location
    if (navigator.geolocation) {
      // add error checking here
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude.toFixed(4);
        this.longitude = position.coords.longitude.toFixed(4);
        // start getting json data
        this.getWeather();
      }, (error) => {
        // see for error codes: https://w3c.github.io/geolocation-api/#position_error_interface
        const errCodeMessage = {
          1: 'Please allow access to your location to retrieve current weather conditions in your area.',
          2: 'Location information is unavailable.',
          3: 'The request to get user location timed out.',
        };
        this.errorMessage = (errCodeMessage[error.code] || 'An unkown error occured.');
      });
    } else {
      this.errorMessage = 'Geolocation not supported by this browser.';
    }
  },

};
</script>

<template>
    <div
      class="content"
      role="main"
    >
      <div
        v-if="!locale && !errorMessage"
        class="loading"
        >
        Loading...
      </div>
      <div v-else-if="errorMessage">
        <div class="error">
          {{ errorMessage }}
        </div>
        <div>
          <!-- give users an easy way to reload on errors -->
          <button
            @click="reloadPage"
            class="reloadButton"
            >
            RELOAD PAGE
          </button>
        </div>
      </div>
      <div v-else>
        <div class="description">{{ description }}</div>
        <div class="locale">{{ locale }}</div>
        <div @click="convertTemp" class="temperature">{{ temp }}&deg;{{ tempScale }}</div>
        <i :class="icon"></i>
      </div>
    </div><!-- .content -->

    <footer>
      <Footer />
    </footer>

</template>

<style lang="scss">
body {
  background-color: #616161;
  box-sizing: border-box;
  margin: 0;
}

#app {
  display: flex; // boilerplate to keep footer down below
  flex-direction: column; // footer at the botom ;)
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  height: 100vh; // needed to stick the footer to bottom
}

.content {
  flex: 1 0 auto; // grow page space to content
  margin: 4rem auto;
  text-align: center;
  width: 40%;

  @media only screen and  (max-width: 600px) {
    margin-top: 2rem;
    width: 100%;
  }
}

footer {
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their
  content's default minimum size. */
  flex-shrink: 0;
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
}

.temperature {
  color: #b3e5fc;
  cursor: pointer;
  font-size: 8rem;
  margin-bottom: 1.25rem;
}

.wi {
  color: #fff;
  font-size: 7rem;
}

.error {
  color: #ffcdd2;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 45vw;

  @media only screen and  (max-width: 600px) {
    width: 100vw;
  }
}

.reloadButton {
  background-color: #b3e5fc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem;

  &:hover {
    background-color: #fff;
  }
}
</style>
