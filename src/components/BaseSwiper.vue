<template>
  <div v-if="swiperSlideList.length" ref="swiperContainer" class="swiper-container">

    <div class="swiper-wrapper">
      <div v-for="(swiperSlide, index) in swiperSlideList" :key="index" class="swiper-slide">
        <img :src="swiperSlide.imgUrl" alt="banner">
      </div>
    </div>

    <!-- 如果需要分页器 -->
    <div v-if="pagination" class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div v-if="navigation" class="swiper-button-prev"></div>
    <div v-if="navigation" class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div v-if="scrollbar" class="swiper-scrollbar"></div>

  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'BaseSwiper',
  props: {
    swiperSlideList: { type: Array, required: true },
    autoplay: { type: Boolean, default: true },
    loop: { type: Boolean, default: true },
    scrollbar: { type: Boolean, default: true },
    pagination: { type: Boolean, default: true },
    paginationClickable: { type: Boolean, default: true },
    navigation: { type: Boolean, default: true }
  },
  watch: {
    swiperSlideList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.swiperContainer, {
            direction: 'horizontal',
            loop: this.loop,
            autoplay: this.autoplay,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: this.paginationClickable,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  },
}
</script>

<style scoped>

</style>