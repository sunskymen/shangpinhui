import { reqGetSearchInfo} from '@/api/index'

// 业务逻辑
const actions = {
  async getSearchList({commit}, params={}) {
    let res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      commit('GETSEARCHLIST', res.data)
    }
  }
}
// 修改数据
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// 存储数据
const state = {
  searchList: {}
}
// 加工数据
const getters = {
  // 当前仓库的sate, 并非大仓库的state
  goodsList(state) {
    // 若数据没回来 则searchList为{} ,searchList.goodsList 为undefined
    return state.searchList.goodsList || []
  },
  trademarkList(state) { 
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}
export default {
  actions,
  mutations,
  state,
  getters
}