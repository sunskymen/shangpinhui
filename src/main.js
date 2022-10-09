import Vue from 'vue'
import App from './App.vue'
// 路由
import router from '@/router/index'
// 全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/MyCarousel.vue'
import Pagination from '@/components/Pagination/MyPagination.vue'
// vuex
import store from '@/store'
// mockServe.js 模拟数据
import '@/mock/mockServe'
// 引入轮播图样式
import 'swiper/dist/css/swiper.css'
// 统一引入接口api 
import * as API from '@/api'

// 按需引入elementUI
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */
// 注册elementUI的弹窗,   另一种写法 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 提示
Vue.config.productionTip = false
// 注册全局组件 第一个参数为名字, 第二个为组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import gif from '@/assets/1.gif'
Vue.use(VueLazyload, {
  // 默认图片
  loading:gif
})

// 引入自定义插件
import myPlugin from '@/plugins/myPlugin'
Vue.use(myPlugin)
// 表单验证插件 vee-validate
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    // this 是 VM
    Vue.prototype.$bus = this
    // api挂到组件身上
    Vue.prototype.$API = API

  },
  router,
  store,
}).$mount('#app')
