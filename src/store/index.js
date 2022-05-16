import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import shopCart from '@/store/shopCart'
import user from '@/store/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { home, search, detail, shopCart, user }
})