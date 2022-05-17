import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

/**
 * 请求拦截器
 */
requests.interceptors.request.use(config => {
    NProgress.start();
    const { uuid_token } = store.state.detail
    const { token } = store.state.user
    if (uuid_token) config.headers.userTempId = uuid_token
    if (token) config.headers.token = token
    return config
})

/**
 * 响应拦截器
 */
requests.interceptors.response.use(res => {
    NProgress.done();
    return res.data
}, error => {
    console.log('error:', error)
    NProgress.done();
    return Promise.reject(new Error('fail'))
})

export default requests