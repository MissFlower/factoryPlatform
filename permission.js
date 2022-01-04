/*
 * @Description: permission
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 16:00:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-22 14:06:05
 */
import router from 'src/router'
import store from 'src/store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/token'
import getPageTitle from '@/utils/getPageTitle'
// import defaultSettings from 'src/settings'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/index', '/register'] // no redirect whitelist
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // const hasToken = getToken(defaultSettings.TOKEN_NAME)
  const hasToken = localStorage.getItem('name')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    } else {
      // const hasPermissionList = store.getters.permissionList && store.getters.permissionList.length > 0
      const hasPermissionList = true
      if (hasPermissionList) {
        next()
      } else {
        try {
          const { permissionList } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', permissionList)

          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          // console.log(to.path)
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    if (~whiteList.indexOf(to.path)) {
      next()
    } else {
      console.log(to.path)
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })

