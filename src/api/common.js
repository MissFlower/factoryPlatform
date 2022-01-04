/*
 * @Description: 公共api
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-08 13:25:45
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-25 14:51:45
 */
import request from '@/utils/request'

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3052
 ** 查询指定类型的字典(型号来自ERP) 参数 - 说明(是否必填)
 * @param dictType factory:工厂,product:产品,model:型号(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 14:36:26
*/
export function dictList(params) {
  return request.get(`/web/dicts/${params.dictType}`)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3101
 ** 获取充电板硬件版本 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 14:37:50
*/
export function getChargeBoardVersion() {
  return request.get('/web/charge-board/getVersion')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3108
 ** 获取通信板硬件版本 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 陈少华
 * @Date 2021-03-11 14:38:37
*/
export function getCommBoardVersion() {
  return request.get('/web/comm-board/getVersion')
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002926
 ** 电池型号列表 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:32:40
*/
export function getBatteryModelList() {
  return request.get('/web/battery_test/model')
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002927
 ** 电芯供应商列表 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:34:33
*/
export function getSupplierList() {
  return request.get('/web/battery_test/supplier')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3468
 ** 设备型号列表(工厂自己维护) 参数 - 说明(是否必填)
 * @param type 类型(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor author
 * @Date 2021-03-11 16:19:44
*/
export function getModelList(params) {
  return request.get('/web/model_hardware_dict/models', params)
}
