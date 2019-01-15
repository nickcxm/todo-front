import request from '@/utils/request'

export function login(data) {
    return request({
        url:'/user/login',
        method:'post',
        data
    })
}

export function sign(data) {
    return request({
        url:'/user/signUp',
        method:'post',
        data
    })
}