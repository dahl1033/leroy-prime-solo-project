import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request to grab all inventory items from DB and assign to itemInventory reducer
function* fetchInventoryItems() {
    const itemsResponse = yield axios.get('/api/mixBuilder/items');
    yield put ({type: 'SET_INVENTORY_ITEMS', payload: itemsResponse.data});
}
// GET request to grab all almond items from DB and assign to almondItems reducer
function* fetchAlmondItems(action) {
    const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });
    yield put ({type: 'SET_ALMOND_ITEMS', payload: itemsResponse.data});
}
// GET request to grab all pecan items from DB and assign to pecanItems reducer
function* fetchPecanItems(action) {
    const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });
    yield put ({type: 'SET_PECAN_ITEMS', payload: itemsResponse.data});
}
// GET request to grab all cashew items from DB and assign to cashewItems reducer
function* fetchCashewItems(action) {
    const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
    yield put ({type: 'SET_CASHEW_ITEMS', payload: itemsResponse.data});
}
// GET request to grab all pistachio items from DB and assign to pistachioItems reducer
function* fetchPistachioItems(action) {
    const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
    yield put ({type: 'SET_PISTACHIO_ITEMS', payload: itemsResponse.data});
}

function* mix_builderSaga() {
    yield takeLatest('FETCH_INVENTORY_ITEMS', fetchInventoryItems);
    yield takeLatest('FETCH_ALMOND_ITEMS', fetchAlmondItems);
    yield takeLatest('FETCH_PECAN_ITEMS', fetchPecanItems);
    yield takeLatest('FETCH_CASHEW_ITEMS', fetchCashewItems);
    yield takeLatest('FETCH_PISTACHIO_ITEMS', fetchPistachioItems);

}

export default mix_builderSaga;