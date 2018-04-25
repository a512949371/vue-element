// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/vue-router.js'
import store from './store'
import './assets/css/theme/008000/index.css'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
 

import '@/assets/iconfont/iconfont.js'

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
