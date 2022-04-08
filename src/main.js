import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import * as echarts from 'echarts';

// axios.defaults.baseURL = 'http://127.0.0.1:4100/szdx'
axios.defaults.baseURL = 'http://zezo.top:4100/szdx'
axios.interceptors.request.use(config => {
  // console.log(window.localStorage.getItem('token'));
  const token = window.localStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + token;
  return config
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})
axios.interceptors.response.use(config => {
  if (config.status === 401) {
    console.log('token 已过期');
  }
  return config
}, (error) => {
  if (error.response.status === 401) {
    console.log('token 已过期');
    localStorage.clear();
    // console.log(window.localStorage.getItem('token'));
    window.location.href('/')
  }
})
const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts = echarts

app.use(store)
app.use(router)
app.mount('#app')
