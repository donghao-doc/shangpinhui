import { reqSearchInfo } from '@/api'

export default {
    namespaced: true,
    state: {
        searchInfo: null
    },
    getters: {},
    mutations: {
        SETSEARCHINFO(state, value) {
            state.searchInfo = value
        }
    },
    actions: {
        async getSearchInfo(context, value={}) {
            try {
                const result = await reqSearchInfo(value)
                console.log('getSearchInfo:', result)
                if (result.code === 200) {
                    context.commit('SETSEARCHINFO', result.data)
                }
            } catch (err) {
                console.log('getSearchInfo err:', err)
            }
        }
    }
}