<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{ orderId }}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{ payInfo.totalFee }}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="@/assets/pay/pay2.jpg" alt="pay"></li>
            <li><img src="@/assets/pay/pay3.jpg" alt="pay"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="@/assets/pay/pay10.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay11.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay12.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay13.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay14.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay15.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay16.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay17.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay18.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay19.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay20.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay21.jpg" alt="pay"></li>
              <li><img src="@/assets/pay/pay22.jpg" alt="pay"></li>
            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a @click="payNow" class="btn">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="#" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'ThePay',
  data() {
    return {
      payInfo: {},
      timer: null,
      payCode: ''
    }
  },
  computed: {
    orderId() {
      return this.$route.query.orderId
    }
  },
  mounted() {
    this.getPayInfo()
  },
  methods: {
    async getPayInfo() {
      try {
        const result = await this.$API.reqPayInfo(this.orderId)
        // console.log('getPayInfo:', result)
        if (result.code === 200) {
          this.payInfo = result.data
        } else {
          window.alert(result.message)
        }
      } catch (err) {
        console.log('getPayInfo err:', err)
      }
    },

    async payNow() {
      const dataUrl = await this.generateQR(this.payInfo.codeUrl)
      const template = `<img src="${dataUrl}" alt="qrcode">`
      this.$alert(template, '打开微信支付', {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: '支付遇到问题',
        confirmButtonText: '我已支付成功',
        showClose: false,
        closeOnClickModal: true,
        beforeClose: (action, instance, done) => {
          clearInterval(this.timer)
          this.timer = null
          if (action === 'cancel') {
            window.alert('请联系管理员')
            done()
          }
          if (action === 'confirm') {
            // if (this.payCode === 200) {
              done()
              this.$router.push('/paySuccess')
            // }
          }
        }
      }).then(() => {}, () => {})
      // 每 1 秒查询支付状态
      if (this.timer) return
      this.timer = setInterval(async () => {
        try {
          const result = await this.$API.reqPayStatus(this.orderId)
          if (result.code === 205) return   // 支付中
          if (result.code === 200) {        // 支付成功
            clearInterval(this.timer)
            this.timer = null
            this.payCode = result.code
            this.$msgbox.close()
            this.$router.push('/paySuccess')
          } else {
            window.alert(result.message)
          }
        } catch (err) {
          console.log('reqPayStatus err:', err)
        }
      }, 1000)
    },

    async generateQR(text) {
      try {
        const result = await QRCode.toDataURL(text)
        // console.log('generateQR:', result)
        return result
      } catch (err) {
        console.log('generateQR err:', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url("~@/assets/pay/icon.png") no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>