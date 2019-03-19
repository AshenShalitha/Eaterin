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
    GUEST_COUNT_CHANGED,
    FETCH_TIME_SLOTS,
    FETCH_TIME_SLOTS_SUCCESS,
    FETCH_TIME_SLOTS_FAILED,
    MAKE_RESERVATION,
    MAKE_RESERVATION_SUCCESS,
    MAKE_RESERVATION_FAILED,
    RESET_RESERVATION_ERROR,
    FETCH_BOOKING_LIST,
    FETCH_BOOKING_LIST_SUCCESS,
    FETCH_BOOKING_LIST_FAILED,
    BOOKING_SELECTED,
    SEARCH_PRESSED,
    SET_ARRAYHOLDER,
    SEARCH_FIELD_CHANGED
} from '../types';

const INITIAL_STATE = {
    selectedRestaurant: {},
    selectedDate: moment().format('MM/DD/YYYY'),
    numberOfGuests: 1,
    selectedTimeSlotObj: {},
    restaurantList: [],
    restaurantsLoading: false,
    restaurantFetchError: false,
    timeSlots: [],
    timeSlotsLoading: false,
    timeSlotError: false,
    timeSlotErrorMessage: '',
    refNumber: '',
    reservationError: false,
    reservationErrorMessage: '',
    reservationLoading: false,
    bookingList: [],
    bookingListLoading: false,
    bookingListError: false,
    bookingListErrorMessage: '',
    selectedBooking: {},
    isSearchVisible: false,
    arrayholder: [],
};

const ERROR_RESET_STATE = {
    reservationError: false,
    reservationErrorMessage: ''
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
        case FETCH_TIME_SLOTS:
            return { ...state, timeSlotsLoading: true };
        case FETCH_TIME_SLOTS_SUCCESS:
            return { ...state, timeSlotsLoading: false, timeSlots: action.payload, timeSlotError: false };
        case FETCH_TIME_SLOTS_FAILED:
            return { ...state, timeSlotsLoading: false, timeSlotError: true, timeSlotErrorMessage: action.payload };
        case MAKE_RESERVATION:
            return { ...state, reservationLoading: true };
        case MAKE_RESERVATION_SUCCESS:
            return { ...state, reservationLoading: false, refNumber: action.payload, reservationError: false };
        case MAKE_RESERVATION_FAILED:
            return { ...state, reservationLoading: false, reservationError: true, reservationErrorMessage: action.payload };
        case RESET_RESERVATION_ERROR:
            return { ...state, ...ERROR_RESET_STATE };
        case FETCH_BOOKING_LIST:
            return { ...state, bookingListLoading: true };
        case FETCH_BOOKING_LIST_SUCCESS:
            return { ...state, bookingListLoading: false, bookingListError: false, bookingList: action.payload };
        case FETCH_BOOKING_LIST_FAILED:
            return { ...state, bookingList: false, bookingListError: true, bookingListErrorMessage: action.payload };
        case BOOKING_SELECTED:
            return { ...state, selectedBooking: action.payload };
        case SEARCH_PRESSED:
            return { ...state, isSearchVisible: action.payload };
        case SET_ARRAYHOLDER:
            return { ...state, arrayholder: action.payload };
        case SEARCH_FIELD_CHANGED:
            return { ...state, restaurantList: action.payload };
        default:
            return state;
    }
};
