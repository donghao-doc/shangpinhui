import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'
import * as API from '@/api'

// 全局组件
import TypeNav from '@/components/TypeNav'
import BaseSwiper from '@/components/BaseSwiper'
import BasePagination from '@/components/BasePagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(BaseSwiper.name, BaseSwiper)
Vue.component(BasePagination.name, BasePagination)

// ElementUI
import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loadingGif from '@/assets/loading.gif'
Vue.use(VueLazyload, {
    loading: loadingGif,
})

// 表单验证
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: field => `${field}必须与密码相同`      // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        confirmPassword: '确认密码',
        agree: '协议'
    }
})
Validator.extend('agree', {     // 自定义校验规则
    validate: value => value,
    getMessage: field => `${field}必须同意`
})

Vue.config.productionTip = false

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
    },
    router,
    store,
    render: h => h(App),
}).$mount('#app')
