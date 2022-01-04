/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-02 10:33:52
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-13 17:17:32
 */

import request from '@/utils/request'

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002818
 ** 电芯查询列表 参数 - 说明(是否必填)
 * @param cellBatch	电芯批次号(否)
 * @param batteryId	电池id(否)
 * @param wrapInfo 包装信息(否)
 * @param serialNumber 流水号(否)
 * @param page 页码(否)
 * @param size 每页条数(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 13:17:44
*/
export function getCellDataList(params) {
  return request.get('/web/battery/page', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002817
 ** 电芯解绑 参数 - 说明(是否必填)
 * @param code  二维码编号(是)
 * @param batteryId	电池ID(是)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 13:18:48
*/
export function batteryUnbind(params) {
  return request.post('/web/battery/unbind', params)
}

/**
 * APIURL: https://www.tapd.cn/62005509/markdown_wikis/show/#1162005509001002836
 ** 电芯列表下载 参数 - 说明(是否必填)
 * @param cellBatch	电芯批次号(否)
 * @param batteryId	电池id(否)
 * @param wrapInfo 包装信息(否)
 * @param serialNumber 流水号(否)
 * @FrontendAuthor 艾东阳
 * @BackendAuthor 刘彬
 * @Date 2021-03-11 13:13:44
*/
export function batteryDownload(params) {
  return request.get('/web/battery/download', params, { responseType: 'blob' })
}
