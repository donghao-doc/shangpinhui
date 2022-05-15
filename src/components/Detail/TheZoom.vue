<template>
  <div class="spec-preview">
    <img :src="imgUrl" alt="img">
    <div @mousemove="moveHandler" ref="eventBox" class="event"></div>
    <div class="big">
      <img ref="big" :src="imgUrl" alt="img">
    </div>
    <div ref="mask" class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'TheZoom',
  props: {
    imgUrl: {
      type: String,
      default(value) {
        return value || require('@/assets/detail/s1.png')
      }
    }
  },
  methods: {
    moveHandler(event) {
      const { offsetX, offsetY } = event
      const { mask, eventBox, big } = this.$refs
      let x = offsetX - mask.offsetWidth / 2
      let y = offsetY - mask.offsetHeight / 2
      if (x <= 0) x = 0
      if (y <= 0) y = 0
      if (x >= eventBox.offsetWidth - mask.offsetWidth) x = eventBox.offsetWidth - mask.offsetWidth
      if (y >= eventBox.offsetHeight - mask.offsetHeight) y = eventBox.offsetHeight - mask.offsetHeight
      mask.style.left = x + 'px'
      mask.style.top = y + 'px'
      big.style.left = -x * 2 + 'px'
      big.style.top = -y * 2 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>