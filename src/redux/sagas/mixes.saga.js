import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// GET  request to retrieve all mixes that can be added to order and assign it to mixesInOrder reducer
function* fetchMixesToOrder() {
    try {
        const itemsResponse = yield axios.get('/api/mixes');
        yield put ({type: 'SET_MIXES_TO_ORDER', payload: itemsResponse.data});
    }
    catch (error) {
        console.log('ERROR in fetchMixesToOrder', error);
    }
}
// GET  request to retrieve all mixes currently in order selected and assign it to mixesToOrder reducer
function* fetchMixesInOrder(action) {
    try {
        const itemsResponse = yield axios.get(`/api/mixes/${action.payload}`);
        yield put ({type: 'SET_MIXES_IN_ORDER', payload: itemsResponse.data});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
}
// GET  request to retrieve current mix size from selected mix and assign in to currentMixSize reducer
function* fetchCurrentMixSize(action) {
    try {
        const itemsResponse = yield axios.get(`/api/mixes/${action.payload.mix.id}/${action.payload.mix.mix_size_id}`); 
        yield put ({type: 'SET_CURRENT_MIX_SIZE', payload: itemsResponse.data});
    }
    catch (error) {
        console.log('ERROR in fetchCurrentMixSize', error);
    }
}
// POST request to add a selected size mix to order
function* addMixToOrder(action) {
    try {
        yield axios.post('/api/mixes', action.payload);
        yield put ({type: 'FETCH_MIXES_IN_ORDER', payload: action.payload.order_id});
    }
    catch (error) {
        console.log('ERROR in addMixToOrder', error);
    }
}
function* fetchMixInfo(action) {
    try {
        const itemsResponse = yield axios.get(`/api/mixes/info/${action.payload.mixId}`);
        console.log('SXSXSXSXSDFAASDFSADFASDFSAF', itemsResponse.data[0]);
        yield put ({type: 'SET_MIX_INFO', payload: itemsResponse.data[0]});
    }
    catch (error) {
        console.log('ERROR in fetchMixInfo', error);
    }
}
// saga watcher
function* mixesSaga() {
    yield takeEvery('FETCH_MIXES_TO_ORDER', fetchMixesToOrder);
    yield takeEvery('ADD_MIX_TO_ORDER', addMixToOrder);
    yield takeEvery('FETCH_MIXES_IN_ORDER', fetchMixesInOrder);
    yield takeEvery('FETCH_CURRENT_MIX_SIZE', fetchCurrentMixSize);
    yield takeEvery('FETCH_MIX_INFO', fetchMixInfo);
}

export default mixesSaga;