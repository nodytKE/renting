import request from '@/utils/request';

export async function getlogin(params) {
    return request(`/getlogin?email=${params.email}&&password=${params.password}`,{
        method:'get',
    })
}

export async function setUserInfo(params) {
    return request('/setuser',{
        method:'post',
        data:params
    })
}
export async function getUserInfo(params) {
    return request(`/getuserinfo?id=${params.id}`,{
        method:'get'
    })
}
export async function register(params) {
    return request ('/register',{
        method:'post',
        data:params
    })
}

export async function getPassword(params) {
    return request ('/sendemail', {
        method: 'post',
        data:params
    })
}