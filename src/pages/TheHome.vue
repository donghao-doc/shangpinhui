<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
  </div>
</template>

<script>
import ListContainer from '@/components/Home/ListContainer'
import TodayRecommend from '@/components/Home/TodayRecommend'

export default {
  name: 'TheHome',
  components: { TodayRecommend, ListContainer }
}
</script>

<style scoped>

</style>