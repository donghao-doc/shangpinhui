import { reqCategoryList } from '@/api'

export default {
    namespaced: true,
    state: {
        categoryList: null
    },
    getters: {
        categoryList(state) {
            if (state.categoryList) {
                return state.categoryList.slice(0, 16)
            }
        }
    },
    mutations: {
        SETCATEGORYLIST(state, value) {
            state.categoryList = value
        }
    },
    actions: {
        async getCategoryList(context) {
            try {
                const result = await reqCategoryList()
                console.log('getCategoryList:', result)
                if (result.code === 200) {
                    context.commit('SETCATEGORYLIST', result.data)
                }
            } catch (err) {
                console.log('getCategoryList err:', err)
            }
        }
    }
}