import moment from 'moment';
import {
    NUMBER_OF_GUESTS_INCREASED,
    NUMBER_OF_GUESTS_DECREASED,
    RESTAURANT_SELECTED,
    DATE_SELECTED,
    TIME_SLOT_SELECTED,
    FETCH_RESTAURANTS,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAILED,
    GUEST_COUNT_CHANGED
} from '../types';

const INITIAL_STATE = {
    selectedRestaurant: {},
    selectedDate: moment().format('MM/DD/YYYY'),
    numberOfGuests: 1,
    selectedTimeSlotObj: {},
    restaurantList: [],
    restaurantsLoading: false,
    restaurantFetchError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SELECTED:
            return { ...state, selectedRestaurant: action.payload };
        case DATE_SELECTED:
            return { ...state, selectedDate: action.payload };
        case GUEST_COUNT_CHANGED:
            return { ...state, numberOfGuests: action.payload };
        case NUMBER_OF_GUESTS_INCREASED:
            return { ...state, numberOfGuests: action.payload };
        case NUMBER_OF_GUESTS_DECREASED:
            return { ...state, numberOfGuests: action.payload };
        case TIME_SLOT_SELECTED:
            return { ...state, selectedTimeSlotObj: action.payload };
        case FETCH_RESTAURANTS:
            return { ...state, restaurantsLoading: true };
        case FETCH_RESTAURANTS_SUCCESS:
            return { ...state, restaurantList: action.payload, restaurantsLoading: false, restaurantFetchError: false };
        case FETCH_RESTAURANTS_FAILED:
            return { ...state, restaurantsLoading: false, restaurantFetchError: true };
        default:
            return state;
    }
};
