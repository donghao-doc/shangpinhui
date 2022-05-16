import Vue from 'vue'
import VueRouter from 'vue-router'
import TheHome from '@/pages/TheHome'
import TheSearch from '@/pages/TheSearch'
import TheLogin from '@/pages/TheLogin'
import TheRegister from '@/pages/TheRegister'
import TheDetail from '@/pages/TheDetail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: TheHome,
            meta: { showFooter: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: TheSearch,
            meta: { showFooter: true }
        },
        {
            name: 'login',
            path: '/login',
            component: TheLogin,
            meta: { showFooter: false }
        },
        {
            name: 'register',
            path: '/register',
            component: TheRegister,
            meta: { showFooter: false }
        },
        {
            name: 'detail',
            path: '/detail/:skuId',
            component: TheDetail,
            meta: { showFooter: true }
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess',
            component: AddCartSuccess,
            meta: { showFooter: true }
        },
        {
            name: 'shopCart',
            path: '/shopCart',
            component: ShopCart,
            meta: { showFooter: true }
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    }
})