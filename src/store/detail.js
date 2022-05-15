import { reqDetailInfo } from '@/api'

export default {
    namespaced: true,
    state: {
        detailInfo: null
    },
    getters: {},
    mutations: {
        SETDETAILINFO(state, value) {
            state.detailInfo = value
        }
    },
    actions: {
        async getDetailInfo(context, skuId) {
            try {
                const result = await reqDetailInfo(skuId)
                console.log('getDetailInfo:', result)
                if (result.code === 200) {
                    context.commit('SETDETAILINFO', result.data)
                }
            } catch (err) {
                console.log('getDetailInfo err:', err)
            }

        }
    }
}