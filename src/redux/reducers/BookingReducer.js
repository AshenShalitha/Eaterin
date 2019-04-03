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
    SEARCH_FIELD_CHANGED,
    DELETE_BOOKING,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILED,
    RESET_DELETE_STATE,
    FETCH_UPCOMING_BOOKINGS,
    FETCH_UPCOMING_BOOKINGS_SUCCESS,
    FETCH_UPCOMING_BOOKINGS_FAILED,
    RESTAURANT_STATUS_UPDATES
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
    timeSlotSuccess: false,
    timeSlotErrorMessage: '',
    isHollyday: false,
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
    bookingDeleteLoading: false,
    bookingDeleteError: false,
    bookingDeleteSuccess: false,
    upcomingBookingsLoading: false,
    upcomingBookings: [],
};

const ERROR_RESET_STATE = {
    reservationError: false,
    reservationErrorMessage: ''
};

const DELETE_RESET_STATE = {
    bookingDeleteLoading: false,
    bookingDeleteError: false,
    bookingDeleteSuccess: false,
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
            return { ...state, timeSlotsLoading: false, timeSlots: action.payload, timeSlotError: false, timeSlotSuccess: true };
        case FETCH_TIME_SLOTS_FAILED:
            return { ...state, timeSlotsLoading: false, timeSlotError: true, timeSlotErrorMessage: action.payload, timeSlotSuccess: false };
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
        case DELETE_BOOKING:
            return { ...state, bookingDeleteLoading: true };
        case DELETE_BOOKING_SUCCESS:
            return { ...state, bookingDeleteLoading: false, bookingDeleteSuccess: true, bookingDeleteError: false };
        case DELETE_BOOKING_FAILED:
            return { ...state, bookingDeleteLoading: false, bookingDeleteSuccess: false, bookingDeleteError: true };
        case RESET_DELETE_STATE:
            return { ...state, ...DELETE_RESET_STATE };
        case FETCH_UPCOMING_BOOKINGS:
            return { ...state, upcomingBookingsLoading: true };
        case FETCH_UPCOMING_BOOKINGS_SUCCESS:
            return { ...state, upcomingBookingsLoading: false, upcomingBookings: action.payload };
        case FETCH_UPCOMING_BOOKINGS_FAILED:
            return { ...state, upcomingBookingsLoading: false };
        case RESTAURANT_STATUS_UPDATES:
            return { ...state, isHollyday: action.payload, timeSlotsLoading: false };
        default:
            return state;
    }
};
