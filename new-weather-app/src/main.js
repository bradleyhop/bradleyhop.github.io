import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// weather-icons via https://github.com/erikflowers/weather-icons
require('./assets/weather-icons/css/weather-icons.min.css');

new Vue({
  render: (h) => h(App),
}).$mount('#app');
