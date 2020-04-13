import {getAllHouse} from '@/services/house';

export default {
    namespace:'housecontent',
    state:{
        allHouse:[]
    },
    effects:{
        *getHouse({payload}, {call, put}){
            const response = yield call (getAllHouse, payload);
            yield put({
                type:'house',
                payload:response
            })
        }
    },
    reducer: {
        house(state,action) {
            return {
                ...state,
                allHouse:action.payload.data
            }
        }
    }
}