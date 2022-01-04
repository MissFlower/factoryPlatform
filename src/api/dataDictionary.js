/*
 * @Description: 数据字典API
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-08 17:40:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:58:03
 */
import request from '@/utils/request'

/**
 * 查询硬件类型
 */
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3416
 ** 查询硬件类型 参数 - 说明(是否必填)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 15:47:15
*/
export function getHardwareType() {
  return request.get('/web/model_hardware_dict/hardware_types')
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3407
 ** 设备型号硬件数据字典列表 参数 - 说明(是否必填)
 * @param modelCode 设备型号编码
 * @param hardwareType 硬件类型
 * @param hardwareVersion 硬件版本
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 15:46:26
*/
export function getHardwareDataList(params) {
  return request.get('/web/model_hardware_dict/list', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3402
 ** 新增设备型号硬件关系 参数 - 说明(是否必填)
 * @param modelCode 设备型号编码
 * @param hardwareType 硬件类型
 * @param hardwareVersion 硬件版本
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 15:45:39
*/
export function addHardwareRelation(params) {
  return request.post('/web/model_hardware_dict/save', params)
}

