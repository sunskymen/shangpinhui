import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客id 生成随机字符串
import { getUUID } from '@/utils/uuid_token'
// 业务逻辑
const actions = {
  // 获取产品信息
  async getGoodInfo({ commit }, skuId) {
    const res = await reqGoodsInfo(skuId)
    if (res.code == 200) {
      commit('GETGOODINFO', res.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({commit},{skuId, skuNum}) {
    const res = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (res.code === 200) {
      // promise返回任意非空字符则代表成功
      return res.code
    } else {
      // 返回一个失败错误
      return Promise.reject(new Error('faile'));
    }
    
  }
}
// 修改数据
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
// 存储数据
const state = {
  goodInfo: {},
  // 游客临时身份 uuid
  uuid_token: getUUID()
}
// 加工数据
const getters = {
  // 简化产品导航数据
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 产品信息简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 售卖属性简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}