/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-27 15:57:04
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 16:10:37
 */
import emoji from './emoji'

const install = function(Vue) {
  Vue.directive('emoji', emoji)
}

if (window.Vue) {
  window['emoji'] = emoji
  Vue.use(install); // eslint-disable-line
}

emoji.install = install
export default emoji
