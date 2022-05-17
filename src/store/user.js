import { reqLogin, reqRegister, reqSendCode } from '@/api'

export default {
    namespaced: true,
    state: {
        token: ''
    },
    getters: {},
    mutations: {
        SETUSERTOKEN(state, value) {
            state.token = value
        }
    },
    actions: {
        async sendCode(context, tel) {
            try {
                const result = await reqSendCode(tel)
                // console.log('sendCode:', result)
                return result
            } catch (err) {
                console.log('sendCode err:', err)
            }
        },
        async userRegister(context, userInfo) {
            try {
                const result = await reqRegister(userInfo)
                // console.log('userRegister:', result)
                return result
            } catch (err) {
                console.log('userRegister err:', err)
            }
        },
        async userLogin(context, userInfo) {
            try {
                const result = await reqLogin(userInfo)
                // console.log('userLogin:', result)
                if (result.code === 200) {
                    context.commit('SETUSERTOKEN', result.data.token)
                }
                return result
            } catch (err) {
                console.log('userLogin err:', err)
            }
        }
    }
}