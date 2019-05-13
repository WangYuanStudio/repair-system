"use strict";

import Vue from "vue"
import axios from "axios";
// import ebus from "./ebus"

let config = {
  baseURL: process.env.NODE_ENV === "production" ? "https://web.test.wangyuan.info/wy_app_bz/public/index.php":'/',
  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};


const _axios = axios.create(config);
_axios.interceptors.request.use(
  function (config) {
    if(localStorage.oid){
      config.headers.oid=localStorage.oid
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    // console.log(error)
    if (error.response && error.response.status === 403) {
      console.log('403')
    } else {
      return Promise.reject(error);
    }
  }
);

Vue.prototype.$axios = _axios