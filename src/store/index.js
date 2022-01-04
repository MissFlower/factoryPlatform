/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 14:47:07
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-14 15:49:12
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import common from './modules/common'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    common,
    permission,
    tagsView
  },
  getters
})
export default store
