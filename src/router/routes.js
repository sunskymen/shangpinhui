// 路由配置信息
// import Home from '@/pages/Home/MyHome'
// import Login from '@/pages/Login/MyLogin'
// import Register from '@/pages/Register/MyRegister'
// import Search from '@/pages/Search/MySearch'
// import Detail from '@/pages/Detail/MyDetail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import myOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// 路由懒加载写法
/* const foo = () => {
  return import('@/pages/Center')
}
{
  path: '/center',
  component: foo,
}
 */
export default [
  // 重定向首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/center',
    // 路由懒加载写法
    component: () => import('@/pages/Center'),
    meta: { show: true },
    name: 'Center',
    children: [
      {
        path: '/',
        redirect: 'myorder',
      },
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder'),
        meta: { show: true },
        name: 'myOrder',
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder'),
        meta: { show: true },
        name: 'GroupOrder',
      }
    ]
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    name: 'Pay',
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    name: 'PaySuccess',
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    name: 'Trade',
    beforeEnter: (to, from, next) => {
      // 路由独享守卫
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home/MyHome'),
    meta: { show: true },
    name: 'Home',

  },
  {
    path: '/login',
    component: () => import('@/pages/Login/MyLogin'),
    meta: { show: false },
    name: 'Login',
  },
  {
    path: '/register',
    component: ()=>import('@/pages/Register/MyRegister'),
    meta: { show: false },
    name: 'Register',
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search/MySearch'),
    meta: { show: true },
    name: 'Search',
  },
  {
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail/MyDetail'),
    name: 'Detail',
    meta: { show: true },
  },
  {
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    name: 'AddCartSuccess',
    meta: { show: true },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    name: 'shopcart',
    meta: { show: true },
  },
]