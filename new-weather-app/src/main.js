import { createApp } from 'vue';
import App from './App.vue';

// weather-icons via https://github.com/erikflowers/weather-icons
require('@/assets/weather-icons/css/weather-icons.min.css');

createApp(App)
  .mount('#app');
