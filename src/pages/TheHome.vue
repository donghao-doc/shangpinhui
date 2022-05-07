<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <TheRank />
    <GuessLike />
    <TheFloor />
    <TheFloor />
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

export default {
  name: 'TheHome',
  components: { TheBrand, TheFloor, GuessLike, TheRank, TodayRecommend, ListContainer }
}
</script>

<style scoped>

</style>