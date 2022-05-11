import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'

import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
