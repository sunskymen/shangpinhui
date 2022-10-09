<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <MyRecommend></MyRecommend>
    <MyRank></MyRank>
    <MyLike></MyLike>
    <MyFloor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></MyFloor>
    <MyBrand></MyBrand>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import MyRecommend from './Recommend/MyRecommend.vue'
import MyRank from './Rank/MyRank.vue'
import MyLike from './Like/MyLike.vue'
import MyFloor from './Floor/MyFloor.vue'
import MyBrand from './Brand/MyBrand.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: {
    ListContainer,
    MyRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  async mounted() {
    // 获取组件数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style>
</style>