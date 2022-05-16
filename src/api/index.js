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

/**
 * 请求搜索模块数据
 * {
 *   "category3Id": "61",
 *   "categoryName": "手机",
 *   "keyword": "小米",
 *   "order": "1:desc",
 *   "pageNo": 1,
 *   "pageSize": 10,
 *   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
 *   "trademark": "4:小米"
 * }
 * @param {Object} params 参数对象，如果没有，默认传 {}
 * @returns {Promise}
 */
export const reqSearchInfo = (params = {}) => request({ url: '/list', method: 'post', data: params })

/**
 * 请求商品详情信息
 * @param skuId 商品 skuId
 * @returns {Promise}
 */
export const reqDetailInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' })

/**
 * 添加商品到购物车
 * @param skuId 商品 skuId
 * @param skuNum 商品数量
 * @returns {Promise}
 */
export const reqAddToCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

/**
 * 请求购物车列表
 * @returns {Promise}
 */
export const reqShopCartList = () => request({ url: '/cart/cartList', method: 'get' })

/**
 * 删除商品
 * @param skuId 商品 skuId
 * @returns {*}
 */
export const reqDeleteCart = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

/**
 * 修改商品选中状态
 * @param skuId 商品 skuId
 * @param isChecked 商品选中状态
 * @returns {*}
 */
export const reqCheckCart = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })