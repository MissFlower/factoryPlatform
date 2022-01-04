/*
 * @Description: 出货抽检api
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 15:20:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-11 16:12:00
 */
import request from '@/utils/request'

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3083
 ** 抽检分页查询 参数 - 说明(是否必填)
 * @param factoryCode 工厂代码(否)
 * @param productCode 产品代码(否)
 * @param modelCode 型号代码(否)
 * @param issue 问题分类,人员问题artificial,来料问题material,设备问题equipment,网络问题network,品质标准quality,工艺问题technology,其他问题other(否)
 * @param search 原因问题点检索(否)
 * @param dataDateStart 数据日期开始时间(是)
 * @param dataDateEnd 数据日期结束时间(是)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 孙少平
 * @Date 2021-03-11 15:49:07
*/
export function samplings(params) {
  return request.post('/web/samplings', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3089
 ** 抽检数据下载 参数 - 说明(是否必填)
 * @param factoryCode 工厂代码(否)
 * @param productCode 产品代码(否)
 * @param modelCode 型号代码(否)
 * @param issue 问题分类,人员问题artificial,来料问题material,设备问题equipment,网络问题network,品质标准quality,工艺问题technology,其他问题other(否)
 * @param search 原因问题点检索(否)
 * @param dataDateStart 数据日期开始时间(是)
 * @param dataDateEnd 数据日期结束时间(是)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor author
 * @Date 2021-03-11 15:53:36
*/
export function download(params) {
  return request.post('/web/samplings/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2798
 ** 上传记录列表 参数 - 说明(是否必填)
 * @param uploadStatus 上传状态(是)
 * @param dataDateStart 数据日期开始时间(是)
 * @param dataDateEnd 数据日期结束时间(是)
 * @param factoryCode 工厂编码(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 孙少平
 * @Date 2021-03-11 15:56:08
*/
export function uploadReportList(params) {
  return request.post('/web/upload', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3095
 ** 抽检数据模板下载 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 孙少平
 * @Date 2021-03-11 16:08:50
*/
export function downloadTemp() {
  return request.get('/web/samplings/download/temp', undefined, { responseType: 'blob' })
}

/**
 * @description 文件上传
 * @param {id} { id: 上传记录主键}
 * @param {params} { file: 上传文件}
 */
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2812
 ** 文件上传 参数 - 说明(是否必填)
 * @param id 上传记录主键(是)
 * @param file 文件(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 孙少平
 * @Date 2021-03-11 16:10:25
*/
export function upload(params) {
  return request.post2Upload(`/web/upload/${params.id}`, params.fileData)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2805
 ** 模块名功能 参数 - 说明(是否必填)
 * @param id 日志记录主键(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 孙少平
 * @Date 2021-03-11 16:11:41
*/
export function logs(params) {
  return request.get(`/web/upload/${params}/logs`)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3397
 ** 标记为无数据日 参数 - 说明(是否必填)
 * @param id 日志记录主键(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 15:54:56
*/
export function setNoDataDay(params) {
  return request.post(`/web/upload/noDataDay/${params}`)
}
