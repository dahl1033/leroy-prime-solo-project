import { combineReducers } from 'redux';


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
const driedFruitItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_DRIED_FRUIT_ITEMS':
            return action.payload;
    }
}
const gummyItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_GUMMY_ITEMS':
            return action.payload;
    }
}
const pretzelItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_PRETZEL_ITEMS':
            return action.payload;
    }
}
const bananaChipItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_BANANA_ITEMS':
            return action.payload;
    }
}
const confectionItems = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_CONFECTION_ITEMS':
            return action.payload;
    }
}
const proportions = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_PROPORTIONS':
            return action.payload;
    }
}






export default combineReducers ({
    almondItems,
    pecanItems,
    cashewItems,
    pistachioItems,
    driedFruitItems,
    bananaChipItems,
    pretzelItems,
    gummyItems,
    confectionItems,
    proportions,
});