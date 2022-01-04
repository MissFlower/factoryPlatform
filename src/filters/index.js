/*
 * @Description: filter
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-04 17:25:30
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-04 17:26:06
 */
// import parseTime, formatTime 用于 filter
export { parseTime, formatTime } from '@/utils'
import { parseTime } from '@/utils'
/**
 * @description: 将日期格式转为带毫秒的格式 2020-08-06 12:33:55.168
 * @param {(string|number)} // time时间戳
 * @return {string | null}
 * @author: AiDongYang
 */
export function parseMillTime(time, cFormat) {
  if (!(/^[0-9]+$/.test(time))) {
    return time
  }
  const timeStr = time.toString()
  const formatTime = timeStr.substring(0, 10).padEnd(3, '0')
  const time_str = parseTime(formatTime, cFormat) + '.' + timeStr.slice(-3)
  return time_str
}
