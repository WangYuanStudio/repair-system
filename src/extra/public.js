"use strict";

import Vue from "vue"

let timer = null
Vue.prototype.$debounce = function(method,delay) {
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(method,delay)
}