import * as types from '../types'
import user from '@/api/User'
const state={
    loginStatus:JSON.parse(localStorage.getItem('loginStatus'))||false,
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||{}
}

const actions={
    /**
     * 登录
     * @param commit
     * @param res
     */
    setUserInfo({commit},res){
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },
    /**
     * 请求用户信息
     */
    getUserData({ commit }, id) {
        commit(types.COM_LOADING_STATUS, true)
        user.UserInfo(id)
            .then(res => {
                commit(types.COM_LOADING_STATUS, false)
                commit(types.GET_USER_DATA, res.data)
            })
    }
}

const getters = {
    // getUserData: state => state.userData,
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    // [types.GET_USER_DATA](state, res) {
    //     state.userData = res
    // }

}

export default {
    state,
    actions,
    getters,
    mutations
}