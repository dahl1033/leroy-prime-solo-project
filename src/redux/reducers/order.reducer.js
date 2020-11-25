import { combineReducers } from 'redux';

const orderId = (state=0, action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_CURRENT_ORDER_ID':
            return action.payload
    }
}
const ordersCompleted = (state=[], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_ORDERS_COMPLETED':
            return action.payload
    }
}
const ordersUncompleted = (state=[], action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_ORDERS_UNCOMPLETED':
            return action.payload
    }
}

export default combineReducers ({
    orderId,
    ordersCompleted,
    ordersUncompleted
});