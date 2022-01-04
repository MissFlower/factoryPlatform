/*
 * @Description: 入口文件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 15:47:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-10 15:23:30
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css'
import 'src/styles/index.scss'
import 'src/assets/iconfonts/iconfont.css'
import 'default-passive-events'
import '../permission'

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'medium'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
