import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$eventBus = new Vue() // Global event bus

new Vue({
  el: '#app',
  render: h => h(App)
})