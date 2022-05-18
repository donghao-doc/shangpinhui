import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import TheHome from '@/pages/TheHome'
import TheSearch from '@/pages/TheSearch'
import TheLogin from '@/pages/TheLogin'
import TheRegister from '@/pages/TheRegister'
import TheDetail from '@/pages/TheDetail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import TheTrade from '@/pages/TheTrade'
import ThePay from '@/pages/ThePay'
import PaySuccess from '@/pages/PaySuccess'

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

const router = new VueRouter({
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
            name: 'trade',
            path: '/trade',
            component: TheTrade,
            meta: { showFooter: true }
        },
        {
            name: 'pay',
            path: '/pay',
            component: ThePay,
            meta: { showFooter: true }
        },
        {
            name: 'paySuccess',
            path: '/paySuccess',
            component: PaySuccess,
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

router.beforeEach(async (to, from, next) => {
    const { token, userInfo } = store.state.user
    if (token) {
        if (to.name === 'login' || to.name === 'register') {
            next(from.path)
        } else {
            if (userInfo.name) {
                next()
            } else {
                const result = await store.dispatch('user/getUserInfo')
                if (result.code === 200) {
                    next()
                } else {
                    // token 失效，获取不到用户信息，需要退出重新登录
                    const result = store.dispatch('user/userLogout')
                    if (result.code === 200) {
                        next('/login')
                    } else {
                        next(from.path)
                    }
                }
            }
        }
    } else {
        next()
    }
})

export default router