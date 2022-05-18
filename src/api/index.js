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

/**
 * 获取验证码
 * @param tel 用户手机号
 * @returns {Promise}
 */
export const reqSendCode = (tel) => request({ url: `/user/passport/sendCode/${tel}`, method: 'get' })

/**
 * 注册用户
 * @param data 用户信息
 * @returns {Promise}
 */
export const reqRegister = (data) => request({ url: '/user/passport/register', method: 'post', data })

/**
 * 用户登录
 * @param data 用户信息
 * @returns {Promise}
 */
export const reqLogin = (data) => request({ url: '/user/passport/login', method: 'post', data })

/**
 * 请求用户信息
 * @returns {Promise}
 */
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' })

/**
 * 退出登录
 * @returns {Promise}
 */
export const reqLogOut = () => request({ url: '/user/passport/logout', method: 'get' })

/**
 * 请求用户地址信息
 * @returns {Promise}
 */
export const reqAddressList = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

/**
 * 获取商品清单信息
 * @returns {Promise}
 */
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' })

/**
 * 提交订单
 * @param tradeNo 订单编号
 * @param data 参数对象
 * @returns {Promise}
 */
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

/**
 * 获取订单支付信息
 * @param orderId 订单 id
 * @returns {Promise}
 */
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })