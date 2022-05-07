<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <TheRank />
    <GuessLike />
  </div>
</template>

<script>
import ListContainer from '@/components/Home/ListContainer'
import TodayRecommend from '@/components/Home/TodayRecommend'
import TheRank from '@/components/Home/GoodsRank'
import GuessLike from '@/components/Home/GuessLike'

export default {
  name: 'TheHome',
  components: { GuessLike, TheRank, TodayRecommend, ListContainer }
}
</script>

<style scoped>

</style>