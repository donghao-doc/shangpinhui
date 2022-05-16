<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="cartInfo in cartInfoList" :key="cartInfo.id" class="cart-list">
          <li class="cart-list-con1">
            <input @change="changeCheckState(cartInfo.skuId, $event.target.checked)" :checked="cartInfo.isChecked === 1" type="checkbox" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" alt="goods">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a @click="changeSkuNum('-', -1, cartInfo)" href="javascript:void(0)" class="mins">-</a>
            <input @input="inputHandler" @change="changeSkuNum('change', $event.target.value*1, cartInfo)"
                   :value="cartInfo.skuNum"
                   autocomplete="off" type="text" min="1" class="itxt">
            <a @click="changeSkuNum('+', 1, cartInfo)" href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteGoods(cartInfo.skuId)" class="sindelet">删除</a>
            <br>
            <a href="#">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input :checked="isAllCheck" class="chooseAll" type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a href="#">移到我的关注</a>
        <a href="#">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="#" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { throttle } from 'lodash'

export default {
  name: 'shopCart',
  computed: {
    ...mapGetters('shopCart', ['cartList']),

    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totalPrice() {
      let sum = 0
      if (!this.cartInfoList.length) return sum
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuPrice * item.skuNum
        }
      })
      return sum
    },
    isAllCheck() {
      if (!this.cartInfoList.length) return false
      return this.cartInfoList.every(item => item.isChecked === 1)
    }
  },
  mounted() {
    this.getShopCartList()
  },
  methods: {
    ...mapActions('shopCart', ['getShopCartList', 'deleteCart', 'checkCart', 'deleteCheckedGoods']),
    ...mapActions('detail', ['addToCart']),

    inputHandler(event) {
      event.target.value = event.target.value.replace(/\D+/g, '')
    },

    changeSkuNum: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case '+':
          disNum = 1
          break
        case '-':
          disNum = cartInfo.skuNum > 1 ? -1 : 0
          break
        case 'change':
          disNum = disNum <= 0 ? 0 : disNum - cartInfo.skuNum
          break
      }
      const result = await this.addToCart(cartInfo.skuId, disNum)
      if (result.code === 200) {
        this.getShopCartList()
      }
    }, 500),

    async deleteGoods(skuId) {
      const result = await this.deleteCart(skuId)
      if (result.code === 200) {
        this.getShopCartList()
      } else {
        window.alert(result.message)
      }
    },

    async changeCheckState(skuId, isChecked) {
      const result = await this.checkCart({ skuId, isChecked: Number(isChecked) })
      if (result.code === 200) {
        this.getShopCartList()
      } else {
        window.alert(result.message)
      }
    },

    async deleteChecked() {
      const promise = await this.deleteCheckedGoods()
      try {
        promise.then(() => {
          this.getShopCartList()
        }, reason => {
          window.alert(reason)
        })
      } catch (err) {
        window.alert(err.message())
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei", serif;
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>