import { reqAddressList, reqOrderInfo } from '@/api'

export default {
    namespaced: true,
    state: {
        addressList: [],
        orderInfo: {}
    },
    getters: {},
    mutations: {
        SETADDRESSLIST(state, value) {
            state.addressList = value
        },
        SETORDERINFO(state, value) {
            state.orderInfo = value
        }
    },
    actions: {
        async getAddressList(context) {
            try {
                const result = await reqAddressList()
                // console.log('getAddressList:', result)
                if (result.code === 200) {
                    context.commit('SETADDRESSLIST', result.data)
                }
            } catch (err) {
                console.log('getAddressList err:', err)
            }
        },
        async getOrderInfo(context) {
            try {
                const result = await reqOrderInfo()
                // console.log('getOrderInfo:', result)
                if (result.code === 200) {
                    context.commit('SETORDERINFO', result.data)
                }
            } catch (err) {
                console.log('getOrderInfo err:', err)
            }
        },
    }
}