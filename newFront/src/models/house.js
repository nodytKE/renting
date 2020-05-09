import {getAllHouse, getHouseDetail,stopSell,addHouseInfo,resetHouseInfo, getHouseByOwnerId, collectHouse,cancelTagHouse, getSomeHouse,getCollectionByUserId, getOwnerInfoByHouseId} from '@/services/house';

export default {
    namespace:'housecontent',
    state:{
        allHouse:[],
        houseinfo:[],
        houseCollectCallback:[],
        someHouse:[],
        ownerInfo:[],
        userCollection:[],
        cancelCallback:[],
        oneOwnerHouse:[],
        addHOuseCallback:[],
        resetCallback:[],
        stopSellCallback:[]
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
        },
        *getCollectByUserId({payload},{call,put}) {
            const response = yield call (getCollectionByUserId, payload);
            yield put({
                type:'getUserCollection',
                payload:response
            })
        },
        *cancelTagHouse({payload},{call,put}) {
            const response = yield call (cancelTagHouse, payload);
            yield put({
                type:'cancelTag',
                payload:response
            })
        },
        *getHouseByOwnerId({payload},{call,put}) {
            const response = yield call (getHouseByOwnerId, payload);
            yield put ({
                type:'getOneOwnerHouse',
                payload:response
            })
        },
        *addHouseInfo({payload},{call,put}) {
            const response = yield call (addHouseInfo, payload);
            yield put ({
                type:'addHouse',
                payload:response
            })
        },
        *resetHouseInfo({payload},{call,put}) {
            const response = yield call (resetHouseInfo, payload);
            yield put ({
                type:'resetHouse',
                payload:response
            })
        },
        *cancelSellingHouse({payload},{call,put}) {
            const response = yield call (stopSell, payload);
            yield put ({
                type:'stopSellHouse',
                payload:response
            })
        },
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
                houseCollectCallback:action.payload
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
        },
        getUserCollection(state,action) {
            return{
                ...state,
                userCollection:action.payload.data
            }
        },
        cancelTag(state,action) {
            return{
                ...state,
                cancelCallback:action.payload
            }
        },
        getOneOwnerHouse(state,action) {
            return{
                ...state,
                oneOwnerHouse:action.payload.data
            }
        },
        addHouse(state,action) {
            return{
                ...state,
                addHOuseCallback:action.payload.data
            }
        },
        resetHouse(state,action) {
            return{
                ...state,
                resetCallback:action.payload.data
            }
        },
        stopSellHouse(state,action) {
            return{
                ...state,
                stopSellCallback:action.payload.data
            }
        }
        
    }
}