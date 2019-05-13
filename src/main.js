import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.eot";
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.svg";
import "./assets/iconfont/iconfont.ttf";
import "./assets/iconfont/iconfont.woff";

import './extra/filter.js'
import './extra/weui.js'
import './extra/axios.js'
import './extra/public.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
