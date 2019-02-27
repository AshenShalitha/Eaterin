import {
    NUMBER_OF_GUESTS_INCREASED, NUMBER_OF_GUESTS_DECREASED
} from '../types';

const INITIAL_STATE = {
    numberOfGuests: 1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NUMBER_OF_GUESTS_INCREASED:
            return { ...state, numberOfGuests: action.payload };
        case NUMBER_OF_GUESTS_DECREASED:
            return { ...state, numberOfGuests: action.payload };
        default:
            return state;
    }
};