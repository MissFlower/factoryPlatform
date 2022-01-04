/*
 * @Description: getters
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 14:48:08
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-14 14:55:23
 */
const getters = {
  sideBar: state => state.app.sideBar,
  name: state => state.user.name,
  // token: state => state.user.token,
  permissionList: state => state.user.permissionList,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
