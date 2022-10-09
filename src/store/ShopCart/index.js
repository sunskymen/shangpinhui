import { reqCartList, reqDeleteGoods, reqUpdateCheckedById } from '@/api/index'

// 业务逻辑
const actions = {
  // 获取列表
  async getCartList({commit}) {
    const res = await reqCartList()
    if (res.code === 200) {
      commit('GETCARTLIST',res.data)
    }
  },
  // 删除商品
  async removeGoods({commit}, skuId) {
    const res = await reqDeleteGoods(skuId)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 修改商品选中状态
  async updateCheckedById({commit}, {skuId, isChecked}) {
    const res = await reqUpdateCheckedById(skuId, isChecked)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 删除全部选中
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let promise = dispatch('removeGoods', item.skuId)
        PromiseAll.push(promise)
      }
    })
    // 数组一个失败则失败, 都成功才成功 
    return Promise.all(PromiseAll)
  },
  // 全选功能
  updateAllCartChecked({ dispatch, state }, checked) {
    let PromiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedById', { skuId:item.skuId, isChecked:checked})
      PromiseAll.push(promise)
    })
    // 数组一个失败则失败, 都成功才成功 
    return Promise.all(PromiseAll)
  }
}
// 修改数据
const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  }
}
// 存储数据
const state = {
  cartList:[]
}
// 加工数据
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
  cartInfoList(state) {
    return state.cartList.cartInfoList || {}
  }
}
export default {
  actions,
  mutations,
  state,
  getters
}