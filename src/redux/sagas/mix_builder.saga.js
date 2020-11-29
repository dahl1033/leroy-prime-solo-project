import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


// ORDER
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
    // GET request to grab all the dried fruit items from the DB and story in driedFruitItems reducer
    function* fetchDriedFruitItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
        yield put ({type: 'SET_DRIED_FRUIT_ITEMS', payload: itemsResponse.data});
    }
    function* fetchGummyItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
        yield put ({type: 'SET_GUMMY_ITEMS', payload: itemsResponse.data});
    }
    function* fetchBananaChipItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
        yield put ({type: 'SET_BANANA_ITEMS', payload: itemsResponse.data});
    }
    function* fetchPretzelItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
        yield put ({type: 'SET_PRETZEL_ITEMS', payload: itemsResponse.data});
    }
    function* fetchConfectionItems() {
        const itemsResponse = yield axios.get(`/api/mixBuilder/item/type`);    
        yield put ({type: 'SET_CONFECTION_ITEMS', payload: itemsResponse.data});
    }
    // GET request to grab all current items in a mix from DB based of mixId
    function* fetchItemsInMix(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mixId} }); 
        console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data});  
    }
    // POST request to add new item to a given mix
    function* addItemToMix(action) {
        yield axios.post('/api/mixBuilder', action.payload);  
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mix_id} });   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data}); 
    }
    // DELETE request to remove item from mix at given mix_id 
    function* deleteItemFromMix(action){
        yield axios.delete(`/api/mixBuilder/${action.payload.mix_id}`, {params: {item_id: action.payload.item_id}});
        const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mix_id} });   
        yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data});
    }
    function* fetchProportionOfItems(action) {
        const itemsResponse = yield axios.get(`/api/mixBuilder/${action.payload.id}`); 
        console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
        yield put ({type: 'SET_PROPORTIONS', payload: itemsResponse.data});
    }

// saga watcher
function* mix_builderSaga() {
    yield takeEvery('FETCH_ALMOND_ITEMS', fetchAlmondItems);
    yield takeEvery('FETCH_PECAN_ITEMS', fetchPecanItems);
    yield takeEvery('FETCH_CASHEW_ITEMS', fetchCashewItems);
    yield takeEvery('FETCH_PISTACHIO_ITEMS', fetchPistachioItems);
    yield takeEvery('ADD_ITEM_TO_MIX', addItemToMix);
    yield takeEvery('FETCH_ITEMS_IN_MIX', fetchItemsInMix);
    yield takeEvery('DELETE_ITEM_IN_MIX', deleteItemFromMix);
    yield takeEvery('FETCH_PROPORTIONS', fetchProportionOfItems);
    yield takeEvery('FETCH_DRIED_FRUIT_ITEMS', fetchDriedFruitItems);
    yield takeEvery('FETCH_CONFECTIONS_ITEMS', fetchConfectionItems);
    yield takeEvery('FETCH_GUMMY_ITEMS', fetchGummyItems);
    yield takeEvery('FETCH_BANANA_ITEMS', fetchBananaChipItems);
    yield takeEvery('FETCH_PRETZEL_ITEMS', fetchPretzelItems);

}

export default mix_builderSaga;