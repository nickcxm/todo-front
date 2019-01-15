import request from '@/utils/request'

export function getGroups(data) {
    return request({
        url:'/group/get',
        method:'get',
        params:data
    })
}

export function delGroup(data) {
    return request({
        url:'/group/delete',
        method:'get',
        params:data
    })
}

export function addGroup(data) {
    return request({
        url:'/group/insert',
        method:'post',
        data
    })
}