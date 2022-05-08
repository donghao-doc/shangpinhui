import request from '@/api/request'

/**
 * 请求三级联动数据
 * @returns {Promise}
 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })