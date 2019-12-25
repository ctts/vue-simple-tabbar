import Vue from 'vue'
import App from './App.vue'
import VueLongRipple from 'vue-long-ripple'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueLongRipple)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')