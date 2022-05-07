import Vue from 'vue'
import VueRouter from 'vue-router'
import TheHome from '@/pages/TheHome'
import TheSearch from '@/pages/TheSearch'
import TheLogin from '@/pages/TheLogin'
import TheRegister from '@/pages/TheRegister'

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
            path: '/search',
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