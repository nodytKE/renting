import request from '@/utils/request';

export async function getAllHouse() {
    return request (`/gethouse`,{
        method:'GET'
    })
}
export async function getHouseDetail(params) {
    return request (`/gethousedetail?id=${params.id}`,{
        method:'GET'
    })
}

export async function collectHouse(params) {
    return request('/collect',{
        method:'post',
        data:params
    })
}

export async function getSomeHouse(params) {
    return request (`/getsomehouse?id=${params.id}`,{
        method:'GET'
    })
}

export async function getOwnerInfoByHouseId(params) {
    return request (`/getownerinfo?id=${params.id}`,{
        method:'GET'
    })
}