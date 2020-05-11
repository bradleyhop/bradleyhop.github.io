import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleUp, faAngleDown, faPlay, faPause, faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

library.add(faAngleUp, faAngleDown, faPlay, faPause, faRedo);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// focus-visible polyfill
require('../node_modules/focus-visible/dist/focus-visible.min');

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
