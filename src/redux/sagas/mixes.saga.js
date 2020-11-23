import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchMixesToOrder() {
    const itemsResponse = yield axios.get('/api/mixes');
    console.log('IN fetchMixesToOrder:',itemsResponse);
    yield put ({type: 'SET_MIXES_TO_ORDER', payload: itemsResponse.data});
}
function* fetchMixesInOrder(action) {
    console.log('IN fetchMixesInOrder action.payload:',action.payload);
    const itemsResponse = yield axios.get(`/api/mixes/${action.payload}`);
    console.log('IN fetchMixesInOrder itemsResponse:',itemsResponse);
    yield put ({type: 'SET_MIXES_IN_ORDER', payload: itemsResponse.data});
}
function* addMixToOrder(action) {
    console.log('In addMixToOrder action.payload: ', action.payload);
    yield axios.post('/api/mixes', action.payload);
    yield put({type:'FETCH_MIXES_IN_ORDER', payload: action.payload.order_id})
}
function* setCurrentWorkingMix(action) {
    yield put ({type: 'SET_CURRENT_MIX_IN_ORDER', payload: action.payload});
    
}
function* fetchCurrentMixSize(action) {
    console.log('in fetch current mix size B', action.payload.mix);
    const itemsResponse = yield axios.get(`/api/mixes/${action.payload.mix.id}/${action.payload.mix.mix_size_id}`); 
    console.log('in fetch current mix size A', itemsResponse.data);
     yield put ({type: 'SET_CURRENT_MIX_SIZE', payload: itemsResponse.data});
}

function* mixesSaga() {
    yield takeEvery('FETCH_MIXES_TO_ORDER', fetchMixesToOrder);
    yield takeEvery('ADD_MIX_TO_ORDER', addMixToOrder);
    yield takeEvery('FETCH_MIXES_IN_ORDER', fetchMixesInOrder);
    yield takeEvery('SET_CURRENT_WORKING_MIX', setCurrentWorkingMix);
    yield takeEvery('FETCH_CURRENT_MIX_SIZE', fetchCurrentMixSize);

}

export default mixesSaga;