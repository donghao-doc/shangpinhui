<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="#" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input v-validate="{ required: true, regex: /^1[345789]\d{9}$/ }" :class="{ invalid: errors.has('phone') }" v-model="tel" type="text" name="phone" placeholder="请输入你的手机号">
        <span v-show="errors.has('phone')" class="error-msg">{{errors.first('phone')}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input v-validate="{ required: true, regex: /^\d{6}$/ }" v-model="code" type="text" name="code" placeholder="请输入验证码">
        <button @click="getCode">获取验证码</button>
        <span v-show="errors.has('code')" class="error-msg">{{errors.first('code')}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input v-validate="{ required: true, regex: /^[0-9a-zA-Z]{8,20}$/ }" v-model="password" type="password" name="password" placeholder="请输入你的登录密码">
        <span v-show="errors.has('password')" class="error-msg">{{errors.first('password')}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-validate="{ required: true, is: password }" v-model="confirmPassword" type="password" name="confirmPassword" placeholder="请输入确认密码">
        <span v-show="errors.has('confirmPassword')" class="error-msg">{{errors.first('confirmPassword')}}</span>
      </div>
      <div class="controls">
        <input v-validate="{ required: true, 'agree': true }" v-model="agree" name="agree" type="checkbox">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span v-show="errors.has('agree')" class="error-msg">{{errors.first('agree')}}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheRegister',
  data() {
    return {
      tel: '',
      code: '',
      password: '',
      confirmPassword: '',
      agree: false
    }
  },
  methods: {
    ...mapActions('user', ['sendCode', 'userRegister']),

    async getCode() {
      if (!this.tel) return
      const result = await this.sendCode(this.tel)
      if (result.code === 200) {
        this.code = result.data
      } else {
        window.alert(result.message)
      }
    },

    async register() {
      const success = await this.$validator.validateAll()   // 全部验证完毕返回布尔值
      if (success) {
        const { tel: phone, password, code } = this
        const result = await this.userRegister({ phone, password, code })
        if (result.code === 200) {
          this.$router.push({ name: 'login' })
        } else {
          window.alert(result.message)
        }
      } else {
        window.alert('请正确填写表单')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      button {
        width: 100px;
        height: 38px;
        position: relative;
        top: -1px;
        left: 8px;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>