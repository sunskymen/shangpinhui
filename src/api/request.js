// 对axios二次封装
import axios from 'axios'
// 引入进度条及样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

import store from '@/store'

// 创建axios实例
const requests = axios.create({
  // 配置对象
  // 基于哪个路径, 基础路径, 默认带上api
  baseURL: '/api',
  // 请求超时 5s
  timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // config 配置对象 包含 header请求头
  if (store.state.detail.uuid_token) {
    // 请求头带上身份
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.token) {
    // 请求头带上身份
    config.headers.token = store.state.user.token
  }
  // 进度条开始
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功回调函数
  // 进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  // 失败回调函数
  return Promise.reject( new Error(error.message))
})

export default requests