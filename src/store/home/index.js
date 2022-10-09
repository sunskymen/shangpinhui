import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
// 业务逻辑
const actions = {
  async categoryList({commit}) {
    let res = await reqCategoryList()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  // 获取首页轮播图
  async getBannerList({commit}) {
    let res = await reqGetBannerList()
    if (res.code === 200) {
      commit('GETBANNERLIST', res.data)
    }
  },
  // 获取首页floor图
  async getFloorList({commit}) {
    let res = await reqGetFloorList()
    if (res.code === 200) {
      commit('GETFLOORLIST', res.data)
    }
  },
}
// 修改数据
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
// 存储数据
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
// 加工数据
const getters = {

}

export default {
  actions,
  mutations,
  state,
  getters
}