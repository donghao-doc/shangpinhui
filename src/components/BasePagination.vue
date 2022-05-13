<template>
  <div @click="togglePage" class="pagination">
    <button data-value="prev" :disabled="pageNo <= 1">上一页</button>

    <button :data-value="1" v-show="startNumAndEndNum.start > 1">1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <button :data-value="number" v-for="number in continuesArr" :key="number" :class="{active: pageNo === number}">{{ number }}</button>

    <button v-show="startNumAndEndNum.end < totalPage-1">···</button>
    <button :data-value="totalPage" v-show="startNumAndEndNum.end < totalPage">{{ totalPage }}</button>

    <button data-value="next" :disabled="pageNo >= totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    pageNo: { type: Number, default: 30 },    // 当前页码
    pageSize: { type: Number, default: 3 },   // 每一页多少条数据
    total: { type: Number, default: 91 },     // 一共有多少条数据
    continues: { type: Number, default: 5 },  // 连续的页码数
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum() {
      let start = 0, end = 0
      if (this.continues >= this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 起始数值边界情况
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 结束数值边界情况
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return { start, end }
    },
    continuesArr() {
      let arr = []
      const { start, end } = this.startNumAndEndNum
      for (let i = start; i <= end; i ++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    togglePage(event) {
      const { value } = event.target.dataset
      if (!value) return
      const pageNum = value === 'prev' ? this.pageNo - 1 : value === 'next' ? this.pageNo + 1 : Number(value)
      this.$emit('getPageNo', pageNum)
    }
  }
}
</script>

<style scoped lang="less">
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>