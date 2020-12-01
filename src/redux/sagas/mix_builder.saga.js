import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


// ORDER
    // GET request to grab all almond items from DB and assign to almondItems reducer
    function* fetchAlmondItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });
            yield put ({type: 'SET_ALMOND_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchAlmondItems', error);
        }
    }
    // GET request to grab all pecan items from DB and assign to pecanItems reducer
    function* fetchPecanItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });
            yield put ({type: 'SET_PECAN_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchPecanItems', error);
        }
    }
    // GET request to grab all cashew items from DB and assign to cashewItems reducer
    function* fetchCashewItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_CASHEW_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchCashewItems', error);
        }
    }
    // GET request to grab all pistachio items from DB and assign to pistachioItems reducer
    function* fetchPistachioItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_PISTACHIO_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchPistachioItems', error);
        }
    }
    // GET request to grab all the dried fruit items from the DB and story in driedFruitItems reducer
    function* fetchDriedFruitItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_DRIED_FRUIT_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchDriedFruitItems', error);
        }
    }
    // GET request to grab all the gummy items from the DB and story in gummyItems reducer
    function* fetchGummyItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_GUMMY_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchGummyItems', error);
        }
    }
    // GET request to grab all the banana items from the DB and story in bananaItems reducer
    function* fetchBananaChipItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_BANANA_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchBananaChipItems', error);
        }
    }
    // GET request to grab all the pretzel items from the DB and story in pretzelItems reducer
    function* fetchPretzelItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item`, { params: {item: action.payload} });    
            yield put ({type: 'SET_PRETZEL_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchPretzelItems', error);
        }
    }
    // GET request to grab  items from the DB where type_descripton is like user inputted string
    function* fetchSearchItems(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/item/search`, { params: {item: action.payload} });    
            yield put ({type: 'SET_SEARCH_ITEMS', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in fetchSearchItems', error);
        }
    }
    // GET request to grab all current items in a mix from DB based of mixId
    function* fetchItemsInMix(action) {
        try {
            const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mixId} }); 
            console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
            yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data}); 
        }
        catch (error) {
            console.log('ERROR in fetchItemsInMix', error);
        } 
    }
    // POST request to add new item to a given mix
    function* addItemToMix(action) {
        try {
            yield axios.post('/api/mixBuilder', action.payload);  
            const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mix_id} });   
            yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data}); 
        }
        catch (error) {
            console.log('ERROR in addItemToMix', error);
        }
        }
    // DELETE request to remove item from mix at given mix_id 
    function* deleteItemFromMix(action){
        try {
            yield axios.delete(`/api/mixBuilder/${action.payload.mix_id}`, {params: {item_id: action.payload.item_id}});
            const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mix_id} });   
            yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data});
        }
        catch (error) {
            console.log('ERROR in deleteItemFromMix', error);
        }
        }
    function* updateProportions(action) {
        try {
            yield axios.put('/api/mixBuilder/proportion', action.payload);  
            const itemsResponse = yield axios.get(`/api/mixBuilder/mixItems`, { params: {mixId: action.payload.mixId} }); 
            console.log(`IN fetchItemsInMix payload: ${itemsResponse.data}`);   
            yield put ({type: 'SET_ITEMS_IN_MIX', payload: itemsResponse.data}); 
        }
        catch (error){
            console.log('ERROR in updateProportions', error);
        }
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
    yield takeEvery('ADD_PROPORTION', updateProportions);
    yield takeEvery('FETCH_DRIED_FRUIT_ITEMS', fetchDriedFruitItems);
    yield takeEvery('FETCH_GUMMY_ITEMS', fetchGummyItems);
    yield takeEvery('FETCH_BANANA_ITEMS', fetchBananaChipItems);
    yield takeEvery('FETCH_PRETZEL_ITEMS', fetchPretzelItems);
    yield takeEvery('FETCH_SEARCH_ITEMS', fetchSearchItems);
}

export default mix_builderSaga;