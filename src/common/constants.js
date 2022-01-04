/*
 * @Description: 魔法字符串
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 11:39:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-01 17:25:42
 */
// 模块名 | 工序
const [MACHINE, SEMIFINISHED, COMMUNICATION_BOARD, CHARGE_BOARD] = [1, 2, 3, 4]
export const MODEL_NAME = Object.freeze({
  MACHINE, // 整机
  SEMIFINISHED, // 半成品
  COMMUNICATION_BOARD, // 通讯板
  CHARGE_BOARD // 充电板
})
export const MODEL_NAME_TEXT = Object.freeze({
  [MODEL_NAME.MACHINE]: '整机',
  [MODEL_NAME.SEMIFINISHED]: '半成品',
  [MODEL_NAME.COMMUNICATION_BOARD]: '通讯板',
  [MODEL_NAME.CHARGE_BOARD]: '充电板'
})

// 上传 | 更新 | 标记
export const FILE_OPERATOR_SIGN = Object.freeze({
  UPLOAD: 0,
  UPDATE: 1,
  SIGN: 2
})

// 文件操作
export const FILE_OPERATOR_TEXT = Object.freeze({
  [FILE_OPERATOR_SIGN.UPLOAD]: '上传',
  [FILE_OPERATOR_SIGN.UPDATE]: '更新'
})

// 日志状态
export const LOG_STATUS = Object.freeze({
  ...FILE_OPERATOR_TEXT,
  [FILE_OPERATOR_SIGN.SIGN]: '标记'
})

// 上传状态
export const UPLOAD_STATUS_SIGN = Object.freeze({
  UNUPLOAD: 0,
  UPLOADED: 1,
  NODATA: 2
})
export const UPLOAD_STATUS_TEXT = Object.freeze({
  [UPLOAD_STATUS_SIGN.UNUPLOAD]: '未上传',
  [UPLOAD_STATUS_SIGN.UPLOADED]: '已上传',
  [UPLOAD_STATUS_SIGN.NODATA]: '无数据日'
})

// 测试状态
// TODO 未测试状态
const [UNADOPT, ADOPTED, UNTEST] = [0, 1, -1]
export const TEST_STATUS = Object.freeze({
  [UNADOPT]: '不通过',
  [ADOPTED]: '通过'
})
export const TEST_STATUS_COLOR = Object.freeze({
  [ADOPTED]: '#27e327',
  [UNADOPT]: '#FF0000',
  [UNTEST]: '#999999'
})

// 字典类型
export const DICTIONARY_TYPE = Object.freeze({
  FACTORY: 'factory', // 工厂
  PRODUCT: 'product', // 产品
  MODEL: 'model' // 型号
})

// 数据字段
const [TEST_AMOUNT, QUALIFY_AMOUNT, REJECT_AMOUNT, PASS_RATE, ONCE_PASS_RATE] = [0, 1, 2, 3, 4]
export const DATA_FIELDS = Object.freeze({
  [TEST_AMOUNT]: '测试数量',
  [QUALIFY_AMOUNT]: '合格数量',
  [REJECT_AMOUNT]: '不良品数量',
  [ONCE_PASS_RATE]: '一次合格率',
  [PASS_RATE]: '合格率'
})

// 问题分类
const PROBLEM_CLASSIFY_DEFINE = {
  ARTIFICIAL: 'artificial',
  MATERIAL: 'material',
  EQUIPMENT: 'equipment',
  NETWORK: 'network',
  QUALITY: 'quality',
  TECHNOLOGY: 'technology',
  OTHER: 'other'
}
export const PROBLEM_CLASSIFY = Object.freeze({
  [PROBLEM_CLASSIFY_DEFINE.ARTIFICIAL]: '人员问题',
  [PROBLEM_CLASSIFY_DEFINE.MATERIAL]: '来料问题',
  [PROBLEM_CLASSIFY_DEFINE.EQUIPMENT]: '设备问题',
  [PROBLEM_CLASSIFY_DEFINE.NETWORK]: '网络问题',
  [PROBLEM_CLASSIFY_DEFINE.QUALITY]: '品质标准',
  [PROBLEM_CLASSIFY_DEFINE.TECHNOLOGY]: '工艺问题',
  [PROBLEM_CLASSIFY_DEFINE.OTHER]: '其他问题'
})
