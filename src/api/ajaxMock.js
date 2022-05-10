import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

/**
 * 请求拦截器
 */
requests.interceptors.request.use(config => {
    NProgress.start();
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