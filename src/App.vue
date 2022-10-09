<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 登录和注册时不显示底部 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/Header/MyHeader.vue';
import MyFooter from './components/Footer/MyFooter.vue';
export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  },
  mounted() {
    // 组件挂载完毕,请求数据(在跟组件中只会请求一次)
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>