import { getUserInfo } from '@/services/userinfo';

export default {
    namespace:'logincheck',
    state:{
        userinfo:[]
    },
    effects: {
        *fetch({payload} , {call ,put}){
            const response = yield call (getUserInfo, payload);
            yield put({
                type:'login',
                payload:response
            })
        }
    },
    reducers: {
        login(state, action) {
            return { 
                ...state,
                userinfo:action.payload.data
            }
        }
    }
}