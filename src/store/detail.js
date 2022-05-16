import { reqDetailInfo, reqAddToCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

export default {
    namespaced: true,
    state: {
        detailInfo: {},
        uuid_token: getUUID()
    },
    getters: {
        categoryView(state) {
            return state.detailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.detailInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailInfo.spuSaleAttrList || []
        }
    },
    mutations: {
        SETDETAILINFO(state, value) {
            state.detailInfo = value
        }
    },
    actions: {
        async getDetailInfo(context, skuId) {
            try {
                const result = await reqDetailInfo(skuId)
                // console.log('getDetailInfo:', result)
                if (result.code === 200) {
                    context.commit('SETDETAILINFO', result.data)
                }
            } catch (err) {
                console.log('getDetailInfo err:', err)
            }
        },
        async addToCart(context, skuId, skuNum) {
            try {
                const result = await reqAddToCart(skuId, skuNum)
                console.log('addCart:', result)
                return result
            } catch (err) {
                console.log('addCart err:', err)
            }
        }
    }
}