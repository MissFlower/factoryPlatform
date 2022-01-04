/*
 * @Description: login
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-09 18:44:03
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-10 18:03:30
 */
import request from '@/utils/request'

/**
 * @description 登录
 * @param {params} { loginName: 用户名}
 * @param {params} { password: 密码}
 */
export function login(params) {
  return request.post('/web/login', params)
}

/**
 * @description 修改密码
 * @param {params} { oldPassword: 原密码}
 * @param {params} { newPassword: 新密码}
 */
export function midifyPassword(params) {
  return request.put('/web/password', params)
}
