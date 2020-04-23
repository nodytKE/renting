import { getUserInfo, setUserInfo,register, getlogin } from '@/services/userinfo';

export default {
    namespace:'logincheck',
    state:{
        userinfo:[],
        setUserInfoBack:[],
        registerCallBack:[]
    },
    effects: {
        *fetch({payload} , {call ,put}){
            const response = yield call (getlogin, payload);
          
                yield put({
                    type:'login',
                    payload:response
                })
    
        },
        *register({payload}, {call,put}){
            const response = yield call (register,payload);
            yield put( {
                type:'registerUser',
                payload:response
            })
        },
        *setuserInfo({payload}, {call,put}){
            const response = yield call (setUserInfo,payload);
            yield put( {
                type:'changeInfo',
                payload:response
            })
        },
        *getUserInfo({payload},{call,put}){
            const response = yield call (getUserInfo,payload);
            yield put ({
                type:'getInfo',
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
        },
        changeInfo(state, action) {
            return{
                ...state,
                userinfo:action.payload.data
            }
        },
        getInfo(state, action) {
            return {
                ...state,
                userinfo:action.payload.data
            }
        },
        registerUser(state, action) {
            return {
                ...state,
                registerCallBack:action.payload
            }
        }
    }
}