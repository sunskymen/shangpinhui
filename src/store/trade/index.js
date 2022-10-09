import { reqUserAddress, reqOrderInfo } from '@/api'

const actions = {
  // 用户地址
  async getUserAddress({ commit }) {
    const res = await reqUserAddress()
    if (res.code === 200) {
      commit('GETUSERADDRESS', res.data)
    }
  },
  // 商品清单
  async getOrderInfo({commit}) {
    const res = await reqOrderInfo()
    if (res.code === 200) {
      commit('GETORDERINFO', res.data)
    }
  }
}

const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

const state = {
  address: [],
  orderInfo:{}
}

const getters = {

}

export default {
  actions,
  mutations,
  state,
  getters
}