/*
 * @Description: 概述api
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 15:19:40
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-22 10:21:14
 */
import request from '@/utils/request'

// 上传记录列表
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2765
 ** 每个设备最后一日抽检质量数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 16:12:58
*/
export function getSamplingData() {
  return request.get('/web/report/samplingData')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2772
 ** 设备质量问题分类数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 16:14:12
*/
export function getClassisuProblemData() {
  return request.get('/web/report/classifyProblemData')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2778
 ** 当日T1单工序测试数据 + 单工序合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 16:14:39
*/
export function getSingleProcessTestDataByT1() {
  return request.get('/web/report/singleProcessTestDataByT1')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2785
 ** 当日T1单工序 一次合格率最终合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 16:15:49
*/
export function getSucRate() {
  return request.get('/web/report/singleProcessSucRateDataByT1')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2792
 ** T1近30日整机合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 16:16:14
*/
export function getDeviceSucRateByT1() {
  return request.get('/web/report/deviceSucRateByT1')
}

/**
 ** 当日S01单工序测试数据 + 单工序合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 刘斌
 * @Date 2021-03-19
*/
export function getSPTestDataByS01() {
  return request.get('/web/report/singleProcessTestDataByS01')
}

/**
 * S01近30日整机合格率数据 无参数
 * /web/report/singleProcessSucRateDataByS01
 * @FrontendAuthor 马文娟
 * @BackendAuthor 刘斌
 * @Date 2021-03-19
 */
export function getSPSucRateDataByS01() {
  return request.get('/web/report/singleProcessSucRateDataByS01')
}

/**
 ** S01近30日整机合格率数据 无参数
 * @FrontendAuthor 马文娟
 * @BackendAuthor liubin
 * @Date 2021-03-19
*/
export function getDeviceSucRateByS01() {
  return request.get('/web/report/batterySucRateByS01')
}

/**
 ** 当日S02单工序测试数据 + 单工序合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 刘斌
 * @Date 2021-03-19
*/
export function getSPTestDataByS02() {
  return request.get('/web/report/singleProcessTestDataByS02')
}

/**
 * S02近30日整机合格率数据 无参数
 * /web/report/singleProcessSucRateDataByS01
 * @FrontendAuthor 马文娟
 * @BackendAuthor 刘斌
 * @Date 2021-03-19
 */
export function getSPSucRateDataByS02() {
  return request.get('/web/report/singleProcessSucRateDataByS02')
}

/**
 ** S01近30日整机合格率数据 无参数
 * @FrontendAuthor 马文娟
 * @BackendAuthor liubin
 * @Date 2021-03-19
*/
export function getDeviceSucRateByS02() {
  return request.get('/web/report/deviceSucRateByS02')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2778
 ** 当日T1，T3单工序测试数据 + 单工序合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周立春
 * @Date 2021-04-16
*/
export function getSingleProcessTestDataByType(type) {
  return request.get(`/web/report/singleProcessTestData?modelName=${type}`)
}

/**
 ** 当日T1，T3单工序 一次合格率最终合格率数据 参数 - 说明(是否必填) 废弃
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周立春
 * @Date 2021-04-16
*/
export function getSucRateByType(type) {
  return request.get(`/web/report/singleProcessSucRateData?modelName=${type}`)
}

/**
 ** T1，T3近30日整机合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周立春
 * @Date 2021-04-16
*/
export function getDeviceSucRateByType(type) {
  return request.get(`/web/report/deviceSucRate?modelName=${type}`)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4438
 ** 当日T4单工序测试数据 + 单工序合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周立春
 * @Date 2021-05-17
*/
export function getSingleProcessTestDataByT4() {
  return request.get(`/web/report/semiProductSingleProcessTestData`)
}

/**
 * http://yapi.devops.vsulv.com/project/98/interface/api/4433
 ** T4近30日半成品合格率数据 参数 - 说明(是否必填)
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周立春
 * @Date 2021-05-17
*/
export function getDeviceSucRateByT4() {
  return request.get(`/web/report/semiProductSucRate`)
}
