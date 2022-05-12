import { reqBannerList, reqCategoryList, reqFloorList } from '@/api'

export default {
    namespaced: true,
    state: {
        categoryList: null,
        bannerList: null,
        floorList: null,
    },
    getters: {
        categoryList(state) {
            return state.categoryList ? state.categoryList.slice(0, 16) : []
        },
        bannerList(state) {
            return state.bannerList ? state.bannerList : []
        },
        floorList(state) {
            return state.floorList ? state.floorList : []
        }
    },
    mutations: {
        SETCATEGORYLIST(state, value) {
            state.categoryList = value
        },
        SETBANNERLIST(state, value) {
            state.bannerList = value
        },
        SETFLOORLIST(state, value) {
            state.floorList = value
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
                // console.log('getBannerList:', result)
                if (result.code === 200) {
                    context.commit('SETBANNERLIST', result.data)
                }
            } catch (err) {
                console.log('getBannerList err:', err)
            }
        },
        async getFloorList(context) {
            try {
                const result = await reqFloorList()
                // console.log('getFloorList:', result)
                if (result.code === 200) {
                    context.commit('SETFLOORLIST', result.data)
                }
            } catch (err) {
                console.log('getFloorList err:', err)
            }
        }
    }
}