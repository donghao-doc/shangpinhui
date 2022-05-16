import { reqCheckCart, reqDeleteCart, reqShopCartList } from '@/api'

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
        },
        async deleteCart(context, skuId) {
            try {
                const result = await reqDeleteCart(skuId)
                console.log('deleteCart:', result)
                return result
            } catch (err) {
                console.log('deleteCart err:', err)
            }
        },
        async checkCart(context, { skuId, isChecked }) {
            try {
                const result = await reqCheckCart(skuId, isChecked)
                console.log('checkCart:', result)
                return result
            } catch (err) {
                console.log('checkCart err:', err)
            }
        },
        deleteCheckedGoods({ dispatch, getters }) {
            let promiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                if (item.isChecked === 1) {
                    const promise = dispatch('deleteCart', item.skuId)
                    promiseAll.push(promise)
                }
            })
            return Promise.all(promiseAll)
        }
    }
}