// api 接口统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数
export const reqCategoryList = () => {
  return requests.get('/product/getBaseCategoryList')
}

// 获取banner接口
export const reqGetBannerList = () => {
  return mockRequests.get('/banner')
}
// 获取floor接口
export const reqGetFloorList = () => {
  return mockRequests.get('/floor')
}

// 获取搜索数据   post
export const reqGetSearchInfo = (params) => {
  return requests({
    url: 'list',
    method: 'post',
    data: params
  })
}

// 请求商品详细信息  get
export const reqGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'get'
  })
}

// 将产品加入购物车或更新产品的个数   post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}
// 获取购物车接口
export const reqCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get'
  })
}
// 购物车删除商品
export const reqDeleteGoods = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
// 修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}
// 获取验证码
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

// 注册
export const reqUserRegister = (data) => {
  return requests({
    url: `/user/passport/register`,
    method: 'post',
    data: data
  })
}
// 登录
export const reqUserLogin = (data) => {
  return requests({
    url: `/user/passport/login`,
    method: 'post',
    data: data
  })
}
// 获取用户信息(带着token)
export const reqUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })
}
// 退出登录
export const reqLogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'get'
  })
}

// 获取用户地址信息
export const reqUserAddress = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
}
//  获取商品清单
export const reqOrderInfo = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get'
  })
}
// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
  })
}
// 支付信息
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}
// 获取支付订单状态
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({url:`/order/auth/${page}/${limit}`, method:'get'})