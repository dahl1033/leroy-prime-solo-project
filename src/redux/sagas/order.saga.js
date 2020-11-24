import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewOrder(action) {
        yield axios.post(`/api/order`, action.payload)
        yield put ({type: 'FETCH_WORKING_ORDER'});
    }
function* getCurrentOrderId(action) {
    const itemsResponse = yield axios.get(`/api/order/order/${action.payload.id}`);
    console.log('in getCurrentOrderId',itemsResponse.data[0].id);
    yield put ({type: 'SET_CURRENT_ORDER_ID', payload: itemsResponse.data[0].id});
    }
function* getOrdersCompleted(action) {
    console.log('in get order completed',action.payload, action.payload.user_id);
    const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'TRUE', user_id: action.payload.user_id} });
    console.log('in getOrdersCompleted', itemsResponse.data);
    yield put ({type: 'SET_ORDERS_COMPLETED', payload: itemsResponse.data});
    }
function* getOrdersUncompleted(action) {
    const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'FALSE', user_id: action.payload.user_id} });
    console.log('in getOrdersUncompleted',itemsResponse.data);
    yield put ({type: 'SET_ORDERS_UNCOMPLETED', payload: itemsResponse.data});
    }
function* submitOrder(action) {
        yield axios.put(`/api/order/submit`, action.payload);
        yield put ({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: action.payload.user_id}});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: action.payload.user_id}});
    }
function* deleteOrder(action) {
        yield axios.delete(`/api/order/${action.payload.id}` );
        yield put ({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: action.payload.user_id}});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: action.payload.user_id}});
    }

function* orderSaga() {
    yield takeLatest('ADD_NEW_ORDER', addNewOrder);
    yield takeLatest('FETCH_ORDERS_COMPLETED', getOrdersCompleted);
    yield takeLatest('FETCH_ORDERS_UNCOMPLETED', getOrdersUncompleted);
    yield takeLatest('SUBMIT_ORDER', submitOrder);
    yield takeLatest('DELETE_ORDER', deleteOrder);
    yield takeLatest('FETCH_CURRENT_ORDER_ID', getCurrentOrderId);

}

export default orderSaga;