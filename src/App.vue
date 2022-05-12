<template>
  <div id="app">
    <TheHeader />
    <router-view></router-view>
    <TheFooter v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { TheFooter, TheHeader },
  mounted() {
    this.getCategoryList()
    this.getBannerList()
    this.getFloorList()
  },
  methods: {
    ...mapActions('home', ['getCategoryList', 'getBannerList', 'getFloorList']),
  }
}
</script>

<style>
</style>
