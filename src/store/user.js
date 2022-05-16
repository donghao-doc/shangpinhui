import { reqRegister, reqSendCode } from '@/api'

export default {
    namespaced: true,
    state: {
    },
    getters: {},
    mutations: {
    },
    actions: {
        async sendCode(context, tel) {
            try {
                const result = await reqSendCode(tel)
                console.log('sendCode:', result)
                return result
            } catch (err) {
                console.log('sendCode err:', err)
            }
        },
        async userRegister(context, userInfo) {
            try {
                const result = await reqRegister(userInfo)
                console.log('userRegister:', result)
                return result
            } catch (err) {
                console.log('userRegister err:', err)
            }
        }
    }
}