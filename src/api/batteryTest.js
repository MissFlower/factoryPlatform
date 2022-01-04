/*
 * @Description: 电池测试API
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-08 14:46:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-06 16:03:49
 */
import request from '@/utils/request'

// -------------------电池测试查询-------------------
/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002857
 ** 整机测试查询列表 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(是)
 * @param state	测试状态(是)
 * @param supplier 电芯供应商(是)
 * @param batteryId	电池id(否)
 * @param operator 工位MAC(否)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:12:30
 */
export function getMachineQueryList(params) {
  return request.get('/web/battery_test/complete/page', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002858
 ** 半成品测试查询列表 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(是)
 * @param state	测试状态(是)
 * @param supplier 电芯供应商(是)
 * @param batteryId	电池id(否)
 * @param operator 工位MAC(否)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:13:20
 */
export function getSemifinishedQueryList(params) {
  return request.get('/web/battery_test/semifi/page', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002858
 ** 整机测试查询数据下载 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(是)
 * @param state	测试状态(是)
 * @param supplier 电芯供应商(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param batteryId	电池id(否)
 * @param operator 工位MAC(否)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:15:49
 */
export function machineQueryDownload(params) {
  return request.get('/web/battery_test/complete/down', params, { responseType: 'blob' })
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002861
 ** 半成品测试查询数据下载 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(是)
 * @param state	测试状态(是)
 * @param supplier 电芯供应商(是)
 * @param startTime	开始时间(是)
 * @param endTime	结束时间(是)
 * @param batteryId	电池id(否)
 * @param operator 工位MAC(否)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:21:02
 */
export function semifinishedDownload(params) {
  return request.get('/web/battery_test/semifi/down', params, { responseType: 'blob' })
}

// -------------------电池测试统计-------------------
/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002864
 ** 整机测试统计查询列表 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:40:59
*/
export function getMachineStatisticsList(params) {
  return request.get('/web/battery_statistics/complete/data', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002865
 ** 整机测试统计数据下载 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:51:01
*/
export function machineStatisticsDownload(params) {
  return request.get('/web/battery_statistics/complete/down', params, { responseType: 'blob' })
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002866
 ** 半成品测试统计查询列表 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 14:53:01
*/
export function getSemifinishedStatisticsList(params) {
  return request.get('/web/battery_statistics/semifi/data', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002867
 ** 半成品测试统计数据下载 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 15:01:49
*/
export function semifinishedStatisticsDownload(params) {
  return request.get('/web/battery_statistics/semifi/down', params, { responseType: 'blob' })
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002877
 ** 整机测试统计数据对比 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 15:05:44
*/
export function machineStatisticsDataContrast(params) {
  return request.get('/web/battery_statistics/complete/contrast', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002878
 ** 半成品测试统计数据对比 参数 - 说明(是否必填)
 * @param batteryModel 电池类型(否)
 * @param queryFiled 数据字段,多个字段用","隔开(否)
 * @param startTime 开始时间yyyy-MM-dd HH:mm:ss格式(是)
 * @param endTime 结束时间yyyy-MM-dd HH:mm:ss格式(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 15:09:43
*/
export function semifinishedStatisticsDataContrast(params) {
  return request.get('/web/battery_statistics/semifi/contrast', params)
}
