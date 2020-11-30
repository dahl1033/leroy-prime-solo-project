import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// GET  request to retrieve all mixes that can be added to order and assign it to mixesInOrder reducer
function* fetchMixesToOrder() {
    const itemsResponse = yield axios.get('/api/mixes');
    console.log('IN fetchMixesToOrder:',itemsResponse);
    yield put ({type: 'SET_MIXES_TO_ORDER', payload: itemsResponse.data});
}
// GET  request to retrieve all mixes currently in order selected and assign it to mixesToOrder reducer
function* fetchMixesInOrder(action) {
    console.log('IN fetchMixesInOrder action.payload:',action.payload);
    const itemsResponse = yield axios.get(`/api/mixes/${action.payload}`);
    console.log('IN fetchMixesInOrder itemsResponse:',itemsResponse.data);
    yield put ({type: 'SET_MIXES_IN_ORDER', payload: itemsResponse.data});
}
// GET  request to retrieve current mix size from selected mix and assign in to currentMixSize reducer
function* fetchCurrentMixSize(action) {
    console.log('in fetch current mix size B', action.payload.mix);
    const itemsResponse = yield axios.get(`/api/mixes/${action.payload.mix.id}/${action.payload.mix.mix_size_id}`); 
    console.log('in fetch current mix size A', itemsResponse.data);
    yield put ({type: 'SET_CURRENT_MIX_SIZE', payload: itemsResponse.data});
}
// POST request to add a selected size mix to order
function* addMixToOrder(action) {
    console.log('ia mixes saga, adding mix to order ap', action.payload);
    yield axios.post('/api/mixes', action.payload);
    yield put ({type: 'FETCH_MIXES_IN_ORDER', payload: action.payload.order_id});
}
// saga watcher
function* mixesSaga() {
    yield takeEvery('FETCH_MIXES_TO_ORDER', fetchMixesToOrder);
    yield takeEvery('ADD_MIX_TO_ORDER', addMixToOrder);
    yield takeEvery('FETCH_MIXES_IN_ORDER', fetchMixesInOrder);
    yield takeEvery('FETCH_CURRENT_MIX_SIZE', fetchCurrentMixSize);

}

export default mixesSaga;