import { reqShopCartList } from '@/api'

export default {
    namespaced: true,
    state: {
        shopCartList: []
    },
    getters: {
        cartList(state) {
            return state.shopCartList[0] || {}
        }
    },
    mutations: {
        SETSHOPCARTLIST(state, value) {
            state.shopCartList = value
        }
    },
    actions: {
        async getShopCartList(context) {
            try {
                const result = await reqShopCartList()
                console.log('getShopCartList:', result)
                if (result.code === 200) {
                    context.commit('SETSHOPCARTLIST', result.data)
                }
            } catch (err) {
                console.log('getShopCartList err:', err)
            }
        }
    }
}