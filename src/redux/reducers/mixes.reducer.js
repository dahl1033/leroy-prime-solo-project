import { combineReducers } from 'redux';

const mixesInOrder = (state=[], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_MIX_IN_ORDER':
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

export default combineReducers ({
    mixesInOrder,
    mixesToOrder,
});