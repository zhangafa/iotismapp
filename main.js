import Vue from 'vue'
import App from './App'

import store from './store'

//异步请求
import api from '@/common/vmeitime-http/'

//绑定工具函数到全局
Vue.prototype.$store = store
Vue.prototype.$api = api

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
