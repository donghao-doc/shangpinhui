import request from '@/api/request'

export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })