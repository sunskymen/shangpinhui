// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone)
    if (res.code == 200) {
      return res.data
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let res = await reqUserRegister(user)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录(token业务)
  async userLogin({ commit }, data) {
    let res = await reqUserLogin(data)
    if (res.code == 200) {
      commit('USERLOGIN', res.data.token)
      // 持久化本地存储token
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    const res = await reqUserInfo()
    if (res.code === 200) {
      commit('GETUSERINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 退出登录
  async userLogout({commit}) {
    const res = await reqLogout()
    if (res.code === 200) {
      commit('LOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  }
}

const mutations = {
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const state = {
  token: getToken(),
  userInfo:{}
}
const getters = {

}
export default {
  actions,
  mutations,
  state,
  getters
}