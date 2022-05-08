import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

import { reqCategoryList } from '@/api'
console.log('reqCategoryList():', reqCategoryList())

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
