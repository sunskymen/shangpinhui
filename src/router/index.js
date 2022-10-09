import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 重写$router.push / replace 方法解决promise无resolve,reject报错问题
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (option, resolve, reject) {
  if (resolve && reject) {
    // 使用call , apply 改变this指向问题
    originPush.call(this, option, resolve, reject)
  } else {
    // 自己加一个回调函数
    originPush.call(this, option, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (option, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, option, resolve, reject)
  } else {
    originReplace.call(this, option, () => { }, () => { })
  }
}

Vue.use(VueRouter)

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  // 判断是否登录
  if (store.state.user.token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 判断是否有用户信息
      if (store.state.user.userInfo.name) {
        next()
      } else {
        // 派发,获取用户信息, 成功则放行
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token 过期, 清楚token
          await store.dispatch('userLogout')
          next('/login')
        } 
      }
    }
  } else {
    // 没登陆跳转登录
    if (to.path.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1 || to.path.indexOf('/paysuccess')!=-1 || to.path.indexOf('/center')!=-1) {
      next('/login?redirect='+ to.path)
    } else {
      next()
    }

  }
})

export default router