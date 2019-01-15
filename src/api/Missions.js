import request from '@/utils/request'

export function getMissions(data) {
    return request({
        url:'/mission/get',
        method:'get',
        params:data
    })
}

export function delMissions(data) {
    return request({
        url:'/mission/delete',
        method:'get',
        params:data
    })
}

export function getImp(data) {
    return request({
        url:'/mission/getImportant',
        method:'get',
        params:data
    })
}

export function addMission(data) {
    return request({
        url:'/mission/add',
        method:'post',
        data
    })
}

export function change(data) {
    return request({
        url:'/mission/change',
        method:'post',
        data
    })
}