import { reqBannerList, reqCategoryList } from '@/api'

export default {
    namespaced: true,
    state: {
        categoryList: null,
        bannerList: null
    },
    getters: {
        categoryList(state) {
            return state.categoryList ? state.categoryList.slice(0, 16) : []
        },
        bannerList(state) {
            return state.bannerList ? state.bannerList : []
        }
    },
    mutations: {
        SETCATEGORYLIST(state, value) {
            state.categoryList = value
        },
        SETBANNERLIST(state, value) {
            state.bannerList = value
        }
    },
    actions: {
        async getCategoryList(context) {
            try {
                const result = await reqCategoryList()
                // console.log('getCategoryList:', result)
                if (result.code === 200) {
                    context.commit('SETCATEGORYLIST', result.data)
                }
            } catch (err) {
                console.log('getCategoryList err:', err)
            }
        },
        async getBannerList(context) {
            try {
                const result = await reqBannerList()
                console.log('getBannerList:', result)
                if (result.code === 200) {
                    context.commit('SETBANNERLIST', result.data)
                }
            } catch (err) {
                console.log('getBannerList err:', err)
            }
        }
    }
}