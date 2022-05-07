import Vue from 'vue'
import VueRouter from 'vue-router'
import TheHome from '@/pages/TheHome'
import TheSearch from '@/pages/TheSearch'
import TheLogin from '@/pages/TheLogin'
import TheRegister from '@/pages/TheRegister'

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
            path: '*',
            redirect: '/'
        }
    ]
})