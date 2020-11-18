import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewOrder(action) {
        yield axios.post(`/api/order`, action.payload)
        yield put ({type: 'FETCH_WORKING_ORDER'});
    }
function* getWorkingOrder() {
    const itemsResponse = yield axios.get('/api/order');
    if (typeof itemsResponse.data[0] != 'undefined'){
        console.log('in getWorkingOrder', itemsResponse.data[0]);
        yield put ({type: 'SET_CURRENT_ORDER_ID', payload: itemsResponse.data[0].id});
    }
}

function* orderSaga() {
    yield takeLatest('ADD_NEW_ORDER', addNewOrder);
    yield takeLatest('FETCH_WORKING_ORDER', getWorkingOrder);
}

export default orderSaga;