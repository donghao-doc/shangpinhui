<template>
  <div id="app">
    <TheHeader />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: { TheFooter, TheHeader }
}
</script>

<style>
</style>
