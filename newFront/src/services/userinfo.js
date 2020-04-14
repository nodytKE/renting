import request from '@/utils/request';

export async function getUserInfo(params) {
    return request(`/getlogin?email=${params.email}&&password=${params.password}`,{
        method:'get',
    })
}