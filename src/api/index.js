import request from '@/api/ajax'
import requestMock from '@/api/ajaxMock'

/**
 * 请求三级联动数据
 * @returns {Promise}
 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })

/**
 * 请求首页轮播图数据
 * @returns {Promise}
 */
export const reqBannerList = () => requestMock.get('/banner')

/**
 * 请求楼层数据
 * @returns {Promise}
 */
export const reqFloorList = () => requestMock.get('/floor')