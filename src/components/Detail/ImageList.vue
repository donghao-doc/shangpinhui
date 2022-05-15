<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div @click="changeCurrent(index)" v-for="(slide, index) in skuImageList" :key="slide.id" class="swiper-slide">
        <img :class="{active: current === index}" :src="slide.imgUrl" alt="img">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      current: 0
    }
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          direction: 'horizontal',
          slidesPerView: 3,

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      })
    }
  },
  methods: {
    changeCurrent(index) {
      this.current = index
      this.$emit('changeCurrent', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>