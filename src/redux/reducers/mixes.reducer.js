import { combineReducers } from 'redux';

const mixesInOrder = (state=[], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_MIXES_IN_ORDER':
            return action.payload
    }
}
const mixesToOrder = (state=[], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_MIXES_TO_ORDER':
            return action.payload
    }
}
const currentWorkingMix = (state={}, action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_CURRENT_MIX_IN_ORDER':
            return action.payload
    }
}
const itemsInCurrentMix = (state=[], action) => {
    switch (action.type) {
        default:
            return state
        case 'SET_ITEMS_IN_MIX':
            console.log(`IN itemsInCurrentMix ${action.payload}`);
            return action.payload
    }
}

export default combineReducers ({
    mixesInOrder,
    mixesToOrder,
    currentWorkingMix,
    itemsInCurrentMix
});