<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <TheRank />
    <GuessLike />
    <TheFloor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <TheBrand />
  </div>
</template>

<script>
import ListContainer from '@/components/Home/ListContainer'
import TodayRecommend from '@/components/Home/TodayRecommend'
import TheRank from '@/components/Home/GoodsRank'
import GuessLike from '@/components/Home/GuessLike'
import TheFloor from '@/components/Home/TheFloor'
import TheBrand from '@/components/Home/TheBrand'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheHome',
  components: { TheBrand, TheFloor, GuessLike, TheRank, TodayRecommend, ListContainer },
  computed: {
    ...mapGetters('home', ['floorList'])
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
  }
}
</script>

<style scoped>

</style>