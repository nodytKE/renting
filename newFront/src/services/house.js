import request from '@/utils/request';

export async function getAllHouse(params) {
    return request ('/gethouse',{
        method:'GET'
    })
}