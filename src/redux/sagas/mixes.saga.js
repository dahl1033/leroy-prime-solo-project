import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchMixesToOrder() {
    const itemsResponse = yield axios.get('/api/mixes');
    console.log('IN fetchMixesToOrder:',itemsResponse);
    yield put ({type: 'SET_MIXES_TO_ORDER', payload: itemsResponse.data});
}

function* mixesSaga() {
    yield takeLatest('FETCH_MIXES_TO_ORDER', fetchMixesToOrder);
}

export default mixesSaga;