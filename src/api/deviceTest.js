/*
 * @Description: 设备测试API
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-15 14:04:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-17 13:51:02
 */
import request from '@/utils/request'

// -------------------电池测试查询-------------------
// ---------------------整机查询---------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2959
 ** 整机查询列表 参数 - 说明(是否必填)
 * @param modelCode 型号编码(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param sid 设备id(是)
 * @param imei IMEI码(是)
 * @param chargeBoardId 充电板id(是)
 * @param operator 工位MAC(是)
 * @param testStatus 测试状态0:不通过1:通过(是)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function getMachineQueryList(params) {
  return request.get('/web/device/item', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2977
 ** 整机查询数据下载 参数 - 说明(是否必填)
 * @param modelCode 型号编码(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param sid 设备id(是)
 * @param imei IMEI码(是)
 * @param chargeBoardId 充电板id(是)
 * @param operator 工位MAC(是)
 * @param testStatus 测试状态0:不通过1:通过(是)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function machineQueryDownload(params) {
  return request.get('/web/device/downloadItem', params, { responseType: 'blob' })
}

// -------------------通讯板查询-------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3004
 ** 通讯板查询 参数 — 说明(是否必填)
 * @param version	硬件版本(否)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param imei IMEL码(否)
 * @param operator 工位MAC(否)
 * @param testStatus 测试状态0:不通过1:通过(否)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function getCommunicationBoardQueryList(params) {
  return request.get('/web/comm-board/item', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3031
 ** 通讯板查询数据下载 参数 — 说明(是否必填)
 * @param version	硬件版本(否)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param imei IMEL码(否)
 * @param operator 工位MAC(否)
 * @param testStatus 测试状态0:不通过1:通过(否)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function communicationBoardQueryDownload(params) {
  return request.get('/web/comm-board/downloadItem', params, { responseType: 'blob' })
}

// -------------------充电板查询-------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2932
 ** 充电板查询 参数 - 说明(是否必填)
 * @param version 硬件版本(是)
 * @param modelCode 型号编码(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param chargeBoardId	充电板id(是)
 * @param operator 工位MAC(是)
 * @param testStatus 测试状态 0:不通过1:通过(是)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function getChargeBoardQueryList(params) {
  return request.get('/web/charge-board/item', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3018
 ** 充电板查询数据下载 参数 - 说明(是否必填)
 * @param version 硬件版本(是)
 * @param modelCode 型号编码(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param chargeBoardId	充电板id(是)
 * @param operator 工位MAC(是)
 * @param testStatus 测试状态 0:不通过1:通过(是)
 * @param page 页码(是)
 * @param size 每页条数(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-11 11:21:28
 */
export function chargeBoardQueryDownload(params) {
  return request.get('/web/charge-board/downloadItem', params, { responseType: 'blob' })
}

// -------------------电池测试统计-------------------
// ---------------------整机统计---------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2971
 ** 整机统计列表 参数 - 说明(是否必填)
 * @param modelCode 型号编码(是)
 * @param startDate 开始时间2020-12-09(是)
 * @param endDate 结束时间2020-12-09(是)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-15 14:26:22
*/
export function getMachineStatisticsList(params) {
  return request.get('/web/device', params)
}

/**
 * 整机统计数据下载
 * @param productCode	{arr: 1,6} 产品编码
 * @param modelCode	{arr: 1,2,3} 型号编码
 * @param startDate	{string: 2020-12-07} 开始时间
 * @param endDate	{string: 2020-12-07} 结束时间
 * @param dataType	{ arr: 1,2} 数据类型 0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率
 */
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2965
 ** 整机统计数据下载 参数 - 说明(是否必填)
 * @param modelCode 型号编码(是)
 * @param startDate 开始时间2020-12-09(是)
 * @param endDate 结束时间2020-12-09(是)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:30:28
*/
export function machineStatisticsDownload(params) {
  return request.get('/web/device/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3065
 ** 整机数据对比 参数 - 说明(是否必填)
 * @param modelCode 型号编码(是)
 * @param startDate 开始时间2020-12-09(是)
 * @param endDate 结束时间2020-12-09(是)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:31:21
*/
export function machineStatisticsDataContrast(params) {
  return request.get('/web/device/contrast', params)
}

// -------------------通讯板统计-------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2998
 ** 获取通讯板统计列表 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:33:45
*/
export function getCommunicationBoardStatisticsList(params) {
  return request.get('/web/comm-board', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3011
 ** 通讯板数据下载 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:44:29
*/
export function communicationBoardStatisticsDownload(params) {
  return request.get('/web/comm-board/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3038
 ** 通讯板数据对比 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:46:26
*/
export function communicationBoardStatisticsDataContrast(params) {
  return request.get('/web/comm-board/contrast', params)
}

// -------------------充电板统计-------------------
/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2925
 ** 获取充电板统计列表 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:47:31
*/
export function getChargeBoardStatisticsList(params) {
  return request.get('/web/charge-board', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/2939
 ** 充电板统计数据下载 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:49:03
*/
export function chargeBoardStatisticsDownload(params) {
  return request.get('/web/charge-board/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/3025
 ** 充电板数据对比 参数 - 说明(是否必填)
 * @param version 硬件版本1,2,3(否)
 * @param dataType 数据类型0:测试数据,1:合格数据,2:不良数据,3:合格率,4:一次性合格率1,2,3(是)
 * @param startDate 开始时间2020-12-07(是)
 * @param endDate 开始时间2020-12-07(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 周利春
 * @Date 2021-03-17 13:50:21
*/
export function chargeBoardStatisticsDataContrast(params) {
  return request.get('/web/charge-board/contrast', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4254
 * 半成品测试统计
 * @param modelCode	 否	型号编码
 * @param version	   否	硬件版本
 * @param dataType	 否	数据类型 0:测试数量,1:合格数量,2:不良数量,3:合格率,4:一次性合格率
 * @param startDate	 否	开始时间
 * @param endDate	   否	结束时间
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周利春
 * @Date 2021-05-18 13:50:21
 */

export function getSemiStatisticsList(params) {
  return request.get('/web/semi_product_test/statistics/list', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4259
 * 半成品测试统计数据下载
 * @param modelCode	 否	型号编码
 * @param version	   否	硬件版本
 * @param dataType	 否	数据类型 0:测试数量,1:合格数量,2:不良数量,3:合格率,4:一次性合格率
 * @param startDate	 否	开始时间
 * @param endDate	   否	结束时间
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周利春
 * @Date 2021-05-18
 */

export function downloadSemiStatisticsList(params) {
  return request.get('/web/semi_product_test/statistics/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4222
 * 半成品测试查询
 * @param modelCode	     是	型号编码
 * @param version	       否	硬件版本
 * @param testStatus	   否	测试状态（示例 1）
 * @param startTime	     是	开始时间（示例 2021-05-01）
 * @param endTime	       是	结束时间
 * @param chargeBoardId	 否	充电板ID
 * @param operator	     否	工位mac
 * @FrontendAuthor       马文娟
 * @BackendAuthor        周利春
 * @Date 2021-05-18 13:50:21
 */

export function getSemiQueryList(params) {
  return request.get('/web/semi_product_test/list', params)
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4231
 * 半成品查询数据下载
 * @param modelCode	     是	型号编码
 * @param version	       否	硬件版本
 * @param testStatus	   否	测试状态（示例 1）
 * @param startTime	     是	开始时间（示例 2021-05-01）
 * @param endTime	       是	结束时间
 * @param chargeBoardId	 否	充电板ID
 * @param operator	     否	工位mac
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周利春
 * @Date 2021-05-18
 */

export function downloadSemiQueryList(params) {
  return request.get('/web/semi_product_test/download', params, { responseType: 'blob' })
}

/**
 * APIURL: http://yapi.devops.vsulv.com/project/98/interface/api/4569
 * 根据工序查询硬件版本号
 * @param process	 否	0
 * @FrontendAuthor 马文娟
 * @BackendAuthor 周利春
 * @Date 2021-05-19
 */

export function getHardware(params) {
  return request.get('/web/model_hardware_dict/hardware', params)
}
