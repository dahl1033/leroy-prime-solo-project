import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


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
}
function* setCurrentWorkingMix(action) {
    yield put ({type: 'SET_CURRENT_MIX_IN_ORDER', payload: action.payload});
    
}

function* mixesSaga() {
    yield takeLatest('FETCH_MIXES_TO_ORDER', fetchMixesToOrder);
    yield takeLatest('ADD_MIX_TO_ORDER', addMixToOrder);
    yield takeLatest('FETCH_MIXES_IN_ORDER', fetchMixesInOrder);
    yield takeLatest('SET_CURRENT_WORKING_MIX', setCurrentWorkingMix)
}

export default mixesSaga;