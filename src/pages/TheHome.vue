<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <TheRank />
  </div>
</template>

<script>
import ListContainer from '@/components/Home/ListContainer'
import TodayRecommend from '@/components/Home/TodayRecommend'
import TheRank from '@/components/Home/TheRank'

export default {
  name: 'TheHome',
  components: { TheRank, TodayRecommend, ListContainer }
}
</script>

<style scoped>

</style>