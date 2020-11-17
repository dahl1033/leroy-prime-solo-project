import { combineReducers } from 'redux';

const itemInventory = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_INVENTORY_ITEMS':
            return action.payload;
    }
}
const almondItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_ALMOND_ITEMS':
            return action.payload;
    }
}
const pecanItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_PECAN_ITEMS':
            return action.payload;
    }
}
const cashewItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_CASHEW_ITEMS':
            return action.payload;
    }
}
const pistachioItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_PISTACHIO_ITEMS':
            return action.payload;
    }
}



export default combineReducers ({
    itemInventory,
    almondItems,
    pecanItems,
    cashewItems,
    pistachioItems
});