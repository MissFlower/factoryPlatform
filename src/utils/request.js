/*
 * @Description: axios二次封装
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 14:43:03
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 14:34:13
 */
import axios from 'axios'
import qs from 'qs'
import store from 'src/store'
import router from 'src/router'
import Vue from 'vue'
import { Message } from 'element-ui'
import { UPDATE_REQUEST_COUNT } from '@/store/modules/common/types'
import { getToken } from '@/utils/token'
import defaultSettings from 'src/settings'

// 请求超时时间
const TIMEOUT = 10000
const BASE_URL = process.env.VUE_APP_BASE_API

const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    common: {
      'X-Requested-with': 'XMLHttpRequest'
    },
    post: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  },
  loading: true,
  showMessage: true
})

// http 请求拦截
http.interceptors.request.use(config => {
  if (config.loading) {
    store.commit(UPDATE_REQUEST_COUNT, 1)
  }

  const token = getToken(defaultSettings.TOKEN_NAME)
  if (token) {
    config.headers[defaultSettings.TOKEN_NAME] = token
  }

  return config
},
error => {
  return Promise.reject(error)
})

// http 相应拦截器
http.interceptors.response.use(response => {
  const result = response.data
  let data = null

  if (response.config.loading) {
    store.commit(UPDATE_REQUEST_COUNT, -1)
  }

  // 处理流文件
  if (response.request.responseType === 'blob') {
    data = response
  }

  // 请求失败
  if (result?.code && result?.code !== 200) {
    const msg = result.message || '服务器内部错误!'
    if (response.config.showMessage) {
      Message.error(`${msg}`)
    }
    // throw new Error(msg)
    return Promise.reject(msg)
  }

  // 请求成功
  return result.data || data
},
error => {
  if (error.config.loading) {
    store.commit(UPDATE_REQUEST_COUNT, -1)
  }

  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    Message.error('当前网络不佳,请检查你的网络!')
    return
  }

  // TODO 统一处理全部的错误代码
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 开发环境直接调用登录接口 模拟登录
        if (process.env.NODE_ENV === 'development') {
          request
            .post('/web/login', {
              loginName: 'test',
              password: '1111'
            })
            .then(() => location.reload())
          return
        }
        if (!localStorage.getItem('name')) { return }
        localStorage.removeItem('name')

        Vue.prototype.$alert('该账号登录已过期，请重新登录。',
          {
            confirmButtonText: '重新登录',
            showClose: false,
            callback: () => {
              router.push(`/login?redirect=${window.location.hash.slice(1)}`)
            }
          }
        )
        break

      case 403:
        // 无权限
        Message.warning(`${error.response.data.message || '操作暂无权限!'}`)
        break

      case 500:
        Message.error(`${error.response.data.message || '服务器内部故障!'}`)
        break
      default:
    }
  }
  return Promise.reject(error)
})

const request = {}
request.postByFormData = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data'
    },
    ...config
  })
}

request.post2Upload = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'charset=UTF-8; multipart/form-data'
    },
    ...config
  })
}

request.postByURL = (url, params, config) => {
  return http({
    url,
    method: 'post',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    ...config
  })
}

;['get', 'post', 'put', 'delete', 'patch'].forEach(method => {
  if (method === 'get' || method === 'delete') {
    request[method] = (url, params, config) => {
      return http({
        url,
        params,
        method,
        ...config
      })
    }
    return
  }

  request[method] = (url, data, config) => {
    return http({
      url,
      method,
      data,
      ...config
    })
  }
})

export default request
