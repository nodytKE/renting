import request from '@/utils/request';

export async function getUserInfo(params) {
    return request('/getlogin',{
        method:'POST',
        data:params
    })
}