import Vue from 'vue';
import App from './App.vue';

// focus-visible polyfill
require('../node_modules/focus-visible/dist/focus-visible.min');

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
