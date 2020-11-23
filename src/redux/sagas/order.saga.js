import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewOrder(action) {
        yield axios.post(`/api/order`, action.payload)
        yield put ({type: 'FETCH_WORKING_ORDER'});
    }
function* getOrdersCompleted() {
    const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'TRUE'} });
    console.log('in getOrdersCompleted',itemsResponse.data);
    yield put ({type: 'SET_ORDERS_COMPLETED', payload: itemsResponse.data});
    }
function* getOrdersUncompleted() {
    const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'FALSE'} });
    console.log('in getOrdersUncompleted',itemsResponse.data);
    yield put ({type: 'SET_ORDERS_UNCOMPLETED', payload: itemsResponse.data});
    }
function* submitOrder(action) {
        yield axios.put(`/api/order/submit`, action.payload);
        yield put ({type: 'FETCH_ORDERS_COMPLETED'});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED'});
    }
function* deleteOrder(action) {
        yield axios.delete(`/api/order/${action.payload.id}` );
        yield put ({type: 'FETCH_ORDERS_COMPLETED'});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED'});
    }

function* orderSaga() {
    yield takeLatest('ADD_NEW_ORDER', addNewOrder);
    yield takeLatest('FETCH_ORDERS_COMPLETED', getOrdersCompleted);
    yield takeLatest('FETCH_ORDERS_UNCOMPLETED', getOrdersUncompleted);
    yield takeLatest('SUBMIT_ORDER', submitOrder);
    yield takeLatest('DELETE_ORDER', deleteOrder);
}

export default orderSaga;