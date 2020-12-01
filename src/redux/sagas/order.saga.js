import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request to retreive current working oder id from DB
function* getCurrentOrderId(action) {
    try {
        const itemsResponse = yield axios.get(`/api/order/order/${action.payload.id}`);
        yield put ({type: 'SET_CURRENT_ORDER_ID', payload: itemsResponse.data[0].id});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// GET request to retrieve completed orders where comp_status = TRUE and assign to ordersCompleted reducer
function* getOrdersCompleted(action) {
    try {
        const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'TRUE', user_id: action.payload.user_id} });
        yield put ({type: 'SET_ORDERS_COMPLETED', payload: itemsResponse.data});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// GET request to retrieve uncompleted orders where comp_status = FALSE and assign to ordersUncompleted reducer
function* getOrdersUncompleted(action) {
    try {
        const itemsResponse = yield axios.get('/api/order/orders',{ params: {type: 'FALSE', user_id: action.payload.user_id} });
        yield put ({type: 'SET_ORDERS_UNCOMPLETED', payload: itemsResponse.data});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// PUT request to UPDATE the DB of an orders comp_status boolean value to be TRUE
function* submitOrder(action) {
    try {
        yield axios.put(`/api/order/submit`, action.payload);
        yield put ({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: action.payload.user_id}});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: action.payload.user_id}});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// POST request to create a new order
function* addNewOrder(action) {
    try {
        yield axios.post(`/api/order`, action.payload)
        yield put ({type: 'FETCH_CURRENT_ORDER_ID', payload: action.payload});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: action.payload.id}});

    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// DELETE request to get rid of an order
function* deleteOrder(action) {
    try {
        yield axios.delete(`/api/order/${action.payload.id}` );
        yield put ({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: action.payload.user_id}});
        yield put ({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: action.payload.user_id}});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    
    }
function* getOrderInfo(action) {
    try {
        console.log(`B get order info ${action.payload.orderId}`);
        const itemsResponse = yield axios.get(`/api/order/order/info/${action.payload.orderId}`);
        console.log('in getOrderInfo', itemsResponse.data[0]);
        yield put ({type: 'SET_CURRENT_ORDER_INFO', payload: itemsResponse.data[0]});
    }
    catch (error) {
        console.log('ERROR in fetchMixesInOrder', error);
    }
    }
// saga watcher
function* orderSaga() {
    yield takeLatest('ADD_NEW_ORDER', addNewOrder);
    yield takeLatest('FETCH_ORDERS_COMPLETED', getOrdersCompleted);
    yield takeLatest('FETCH_ORDERS_UNCOMPLETED', getOrdersUncompleted);
    yield takeLatest('SUBMIT_ORDER', submitOrder);
    yield takeLatest('DELETE_ORDER', deleteOrder);
    yield takeLatest('FETCH_CURRENT_ORDER_ID', getCurrentOrderId);
    yield takeLatest('FETCH_CURRENT_ORDER_INFO', getOrderInfo);


}

export default orderSaga;