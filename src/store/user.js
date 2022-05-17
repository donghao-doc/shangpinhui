import { reqLogin, reqLogOut, reqRegister, reqSendCode, reqUserInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/token'

export default {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {}
    },
    getters: {},
    mutations: {
        SETUSERTOKEN(state, value) {
            state.token = value
        },
        SETUSERINFO(state, value) {
            state.userInfo = value
        },
        CLEAR(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
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
                    setToken(result.data.token)
                }
                return result
            } catch (err) {
                console.log('userLogin err:', err)
            }
        },
        async getUserInfo(context) {
            try {
                const result = await reqUserInfo()
                console.log('getUserInfo:', result)
                if (result.code === 200) {
                    context.commit('SETUSERINFO', result.data)
                }
            } catch (err) {
                console.log('getUserInfo err:', err)
            }
        },
        async userLogout(context) {
            try {
                const result = await reqLogOut()
                console.log('userLogout:', result)
                if (result.code === 200) {
                    context.commit('CLEAR')
                }
                return result
            } catch (err) {
                console.log('userLogout err:', err)
            }
        }
    }
}