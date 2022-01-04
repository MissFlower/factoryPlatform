/*
 * @Description: 路由
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 15:47:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-16 15:12:15
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import MainLayout from '@/layout/MainLayout'
import FullScreenLayout from '@/layout/FullScreenLayout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('src/views/Redirect')
      }
    ]
  },
  {
    path: '/login',
    component: FullScreenLayout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('src/views/Login'),
        meta: {
          title: '登录',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Summary',
        component: () => import('src/views/Summary'),
        meta: {
          title: '概述',
          icon: 'el-icon-s-home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/spotcheck',
    component: MainLayout,
    meta: {
      title: '出货抽检',
      icon: 'el-icon-truck'
    },
    children: [
      {
        path: '',
        name: 'SpotCheck',
        component: () => import('src/views/SpotCheck'),
        meta: {
          title: '抽检列表'
        }
      },
      {
        path: 'upload',
        name: 'SpotCheckUpload',
        component: () => import('src/views/SpotCheckUpload'),
        meta: {
          title: '抽检上传'
        }
      }
    ]
  },
  {
    path: '/device',
    component: MainLayout,
    redirect: '/device/statistics',
    meta: {
      title: '设备测试',
      icon: 'el-icon-s-finance'
    },
    children: [
      {
        path: 'statistics',
        name: 'DeviceStatistics',
        component: () => import('src/views/DeviceStatistics'),
        meta: {
          title: '设备测试统计'
        }
      },
      {
        path: 'query',
        name: 'DeviceQuery',
        component: () => import('src/views/DeviceQuery'),
        meta: {
          title: '设备测试查询'
        }
      }
    ]
  },
  {
    path: '/battery',
    component: MainLayout,
    redirect: '/battery/statistics',
    meta: {
      title: '电池测试',
      icon: 'el-icon-camera'
    },
    children: [
      {
        path: 'statistics',
        name: 'BatteryStatistics',
        component: () => import('src/views/BatteryStatistics'),
        meta: {
          title: '电池测试统计'
        }
      },
      {
        path: 'query',
        name: 'BatteryQuery',
        component: () => import('src/views/BatteryQuery'),
        meta: {
          title: '电池测试查询'
        }
      }
    ]
  },
  {
    path: '/cell',
    component: MainLayout,
    alwaysShow: true,
    redirect: '/cell/query',
    meta: {
      title: '电芯数据',
      icon: 'el-icon-s-data'
    },
    children: [
      {
        path: 'query',
        name: 'CellBatchQuery',
        component: () => import('src/views/CellBatchQuery'),
        meta: {
          title: '批次查询'
        }
      }
    ]
  },
  {
    path: '/dictionary',
    component: MainLayout,
    alwaysShow: true,
    redirect: '/dictionary/host',
    meta: {
      title: '数据字典',
      icon: 'el-icon-reading'
    },
    children: [
      {
        path: 'host',
        name: 'DictionaryHostMode',
        component: () => import('src/views/DictionaryHostMode'),
        meta: {
          title: '上位机型号硬件'
        }
      }
    ]
  },
  // {
  //   path: '/machine',
  //   component: MainLayout,
  //   meta: {
  //     title: '整机测试',
  //     icon: 'el-icon-camera'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'MachineStatistics',
  //       component: () => import('src/views/MachineStatistics'),
  //       meta: {
  //         title: '整机统计'
  //       }
  //     },
  //     {
  //       path: 'search',
  //       name: 'MachineSearch',
  //       component: () => import('src/views/MachineSearch'),
  //       meta: {
  //         title: '整机查询'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/chargeBoard',
  //   component: MainLayout,
  //   meta: {
  //     title: '充电板测试',
  //     icon: 'el-icon-s-finance'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'ChargeBoardStatistics',
  //       component: () => import('src/views/ChargeBoardStatistics'),
  //       meta: {
  //         title: '充电板统计'
  //       }
  //     },
  //     {
  //       path: 'search',
  //       name: 'ChargeBoardSearch',
  //       component: () => import('src/views/ChargeBoardSearch'),
  //       meta: {
  //         title: '充电板查询'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/communicationBoard',
  //   component: MainLayout,
  //   meta: {
  //     title: '通讯板测试',
  //     icon: 'el-icon-suitcase'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'CommunicationBoardStatistics',
  //       component: () => import('src/views/CommunicationBoardStatistics'),
  //       meta: {
  //         title: '通讯板统计'
  //       }
  //     },
  //     {
  //       path: 'CommunicationBoardSearch',
  //       name: 'CommunicationBoardSearch',
  //       component: () => import('src/views/CommunicationBoardSearch'),
  //       meta: {
  //         title: '通讯板查询'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: FullScreenLayout,
    hidden: true,
    children: [
      {
        path: '',
        name: '404',
        component: () => import('src/views/ErrorPage/404'),
        meta: {
          title: '404页面'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export const asyncRoutes = []

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
