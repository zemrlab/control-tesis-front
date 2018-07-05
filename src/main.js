// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// router
import router from './router'
// ui
import KeenUI from 'keen-ui'
import mixins from './mixins'
// axios
import axios from './http'
// use- mixins
Vue.use(KeenUI)
Vue.mixin(mixins)
Vue.config.productionTip = false
import './sass/app.scss'
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
