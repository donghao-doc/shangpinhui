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
            component: TheHome
        },
        {
            name: 'search',
            path: '/search',
            component: TheSearch
        },
        {
            name: 'login',
            path: '/login',
            component: TheLogin
        },
        {
            name: 'register',
            path: '/register',
            component: TheRegister
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})