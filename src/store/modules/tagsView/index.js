/*
 * @Description: TagsView
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-07 18:47:24
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-08 18:50:38
 */
import * as types from './types'
const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  [types.ADD_VISITED_VIEW]: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  [types.ADD_CACHED_VIEW]: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  [types.DEL_VISITED_VIEW]: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [types.DEL_CACHED_VIEW]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  [types.DEL_OTHERS_VISITED_VIEWS]: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [types.DEL_OTHERS_CACHED_VIEWS]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  [types.DEL_ALL_VISITED_VIEWS]: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  [types.DEL_ALL_CACHED_VIEWS]: state => {
    state.cachedViews = []
  },

  [types.UPDATE_VISITED_VIEW]: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  [types.addView]({ dispatch }, view) {
    dispatch(types.addVisitedView, view)
    dispatch(types.addCachedView, view)
  },
  [types.addVisitedView]({ commit }, view) {
    commit(types.ADD_VISITED_VIEW, view)
  },
  [types.addCachedView]({ commit }, view) {
    commit(types.ADD_CACHED_VIEW, view)
  },

  [types.delView]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(types.delVisitedView, view)
      dispatch(types.delCachedView, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [types.delVisitedView]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(types.DEL_VISITED_VIEW, view)
      resolve([...state.visitedViews])
    })
  },
  [types.delCachedView]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(types.DEL_CACHED_VIEW, view)
      resolve([...state.cachedViews])
    })
  },

  [types.delOthersViews]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(types.delOthersVisitedViews, view)
      dispatch(types.delOthersCachedViews, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [types.delOthersVisitedViews]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(types.DEL_OTHERS_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  [types.delOthersCachedViews]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(types.DEL_OTHERS_CACHED_VIEWS, view)
      resolve([...state.cachedViews])
    })
  },

  [types.delAllViews]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(types.delAllVisitedViews, view)
      dispatch(types.delAllCachedViews, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [types.delAllVisitedViews]({ commit, state }) {
    return new Promise(resolve => {
      commit(types.DEL_ALL_VISITED_VIEWS)
      resolve([...state.visitedViews])
    })
  },
  [types.delAllCachedViews]({ commit, state }) {
    return new Promise(resolve => {
      commit(types.DEL_ALL_CACHED_VIEWS)
      resolve([...state.cachedViews])
    })
  },

  [types.updateVisitedView]({ commit }, view) {
    commit(types.UPDATE_VISITED_VIEW, view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
