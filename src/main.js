import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'
import * as API from '@/api'

import TypeNav from '@/components/TypeNav'
import BaseSwiper from '@/components/BaseSwiper'
import BasePagination from '@/components/BasePagination'

Vue.component(TypeNav.name, TypeNav)
Vue.component(BaseSwiper.name, BaseSwiper)
Vue.component(BasePagination.name, BasePagination)

import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueLazyload from 'vue-lazyload'
import loadingGif from '@/assets/loading.gif'
Vue.use(VueLazyload, {
    loading: loadingGif,
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
