import request from '@/utils/request';

export async function getAllHouse() {
    return request (`/getallhouse`,{
        method:'GET'
    })
}
export async function getHouseDetail(params) {
    return request (`/gethousedetail?id=${params.id}`,{
        method:'GET'
    })
}

// 收藏
export async function collectHouse(params) {
    return request('/collect',{
        method:'post',
        data:params
    })
}

// 查询收藏
export async function getCollectionByUserId(params) {
    return request (`/getcollect?id=${params.id}`,{
        method:'GET'
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

export async function cancelTagHouse(params) {
    return request (`/canceltag?`,{
        method:'POST',
        data:params
    })
}

// 通过userId 查找他名下的房源
export async function getHouseByOwnerId(params){
    return request (`/gethousebyownerid?id=${params.id}`,{
        method:"GET"
    })
}

// 添加房屋信息
export async function addHouseInfo(params) {
    return request('/putaway',{
        method:'POST',
        data:params
    })
}

// 修改
export async function resetHouseInfo(params) {
    return request('/sethouse',{
        method:'POST',
        data:params
    })
}

// 下架房源
export async function stopSell(params) {
    return request('/stopsell',{
        method:'POST',
        data:params
    })
}