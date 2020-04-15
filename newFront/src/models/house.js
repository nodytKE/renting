import {getAllHouse, getHouseDetail, collectHouse, getSomeHouse, getOwnerInfoByHouseId} from '@/services/house';

export default {
    namespace:'housecontent',
    state:{
        allHouse:[],
        houseinfo:[],
        houseCollectCallback:[],
        someHouse:[],
        ownerInfo:[],
    },
    effects:{
        *getHouse({payload}, {call, put}){
            const response = yield call (getAllHouse, payload);
            yield put({
                type:'house',
                payload:response
            })
        },
        *getHouseDetail({payload},{call,put}) {
            const response = yield call (getHouseDetail, payload);
            yield put({
                type:'houseDetail',
                payload:response
            })
        },
        *collectHouse({payload},{call,put}) {
            const response = yield call (collectHouse, payload);
            yield put({
                type:'houseCollection',
                payload:response
            })
        },
        *getSomeHouse({payload},{call,put}) {
            const response = yield call (getSomeHouse, payload);
            yield put({
                type:'getAnotherHouse',
                payload:response
            })
        },
        *getOwnerInfoByHouseId({payload},{call,put}) {
            const response = yield call (getOwnerInfoByHouseId, payload);
            yield put({
                type:'getOwnerInfo',
                payload:response
            })
        }
        
    },
    reducers: {
        house(state,action) {
            return {
                ...state,
                allHouse:action.payload.data
            }
        },
        houseDetail(state,action) {
            return {
                ...state,
                houseinfo:action.payload.data
            }
        },
        houseCollection(state,action) {
            return{
                ...state,
                houseCollectCallback:action.payload.data
            }
        },
        getAnotherHouse(state,action) {
            return{
                ...state,
                someHouse:action.payload.data
            }
        },
        getOwnerInfo(state,action) {
            return{
                ...state,
                ownerInfo:action.payload.data
            }
        }
        
    }
}