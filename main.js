import Vue from 'vue'
import App from './App'

import store from './store'

import api from '@/common/vmeitime-http/'
import util from '@/common/util'

import echarts from './common/echarts/echarts.min' 
 
//绑定工具函数到全局
Vue.prototype.$util = util
Vue.prototype.$echarts =echarts
Vue.prototype.$store = store
Vue.prototype.$api = api

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
