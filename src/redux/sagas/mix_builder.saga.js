import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


// ORDER

// ITEM INVENTORY
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

    function* fetchItemsInMix(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {item: action.payload} }); 
        console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data});  
    }
    function* addItemToMix(action) {
        yield axios.post('/api/mixBuilder', action.payload);  
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {item: action.payload.mix_id} });   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data}); 
    }
    function* deleteItemFromMix(action){
        yield axios.delete(`/api/mixBuilder/${action.payload.mix_id}`, {params: {item_id: action.payload.item_id}});
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {item: action.payload.mix_id} });   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data});
    }
    function* fetchProportionOfItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/${action.payload.id}`); 
        console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
        yield put ({type: 'SET_PROPORTIONS', payload: itemsResponse.data});
    }


function* mix_builderSaga() {
    yield takeEvery('FETCH_INVENTORY_ITEMS', fetchInventoryItems);
    yield takeEvery('FETCH_ALMOND_ITEMS', fetchAlmondItems);
    yield takeEvery('FETCH_PECAN_ITEMS', fetchPecanItems);
    yield takeEvery('FETCH_CASHEW_ITEMS', fetchCashewItems);
    yield takeEvery('FETCH_PISTACHIO_ITEMS', fetchPistachioItems);
    yield takeEvery('ADD_ITEM_TO_MIX', addItemToMix);
    yield takeEvery('FETCH_ITEMS_IN_MIX', fetchItemsInMix);
    yield takeEvery('DELETE_ITEM_IN_MIX', deleteItemFromMix);
    yield takeEvery('FETCH_PROPORTIONS', fetchProportionOfItems);

}

export default mix_builderSaga;