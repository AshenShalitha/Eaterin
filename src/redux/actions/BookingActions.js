import axios from 'axios';
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
    SEARCH_FIELD_CHANGED,
    SET_ARRAYHOLDER,
    DELETE_BOOKING,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILED,
    RESET_DELETE_STATE,
    FETCH_UPCOMING_BOOKINGS,
    FETCH_UPCOMING_BOOKINGS_SUCCESS,
    FETCH_UPCOMING_BOOKINGS_FAILED,
    RESTAURANT_STATUS_UPDATES
} from '../types';
import {
    GET_RESTAURANTS,
    GET_TIME_SLOTS,
    CREATE_RESERVATION,
    GET_BOOKINGS,
    GET_UPCOMING_BOOKINGS,
} from '../../api/API';

export const restaurantSelected = (restaurant) => {
    return {
        type: RESTAURANT_SELECTED,
        payload: restaurant
    };
};

export const dateSelected = (date) => {
    return {
        type: DATE_SELECTED,
        payload: date
    };
};

export const guestCountChanged = (value) => {
    return {
        type: GUEST_COUNT_CHANGED,
        payload: value
    };
};

export const guestsIncreased = (number) => {
    const x = number + 1;
    return {
        type: NUMBER_OF_GUESTS_INCREASED,
        payload: x
    };
};

export const guestsDecreased = (number) => {
    const y = number - 1;
    return {
        type: NUMBER_OF_GUESTS_DECREASED,
        payload: y
    };
};

export const timeSlotSelected = (timeSlotObj) => {
    return {
        type: TIME_SLOT_SELECTED,
        payload: timeSlotObj
    };
};

export const onBookingSelected = booking => {
    return {
        type: BOOKING_SELECTED,
        payload: booking
    };
};

export const onSearchPressed = status => {
    return {
        type: SEARCH_PRESSED,
        payload: status
    };
};

export const fetchRestaurants = (date) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RESTAURANTS });
        axios({
            method: 'get',
            url: `${GET_RESTAURANTS}/${date}`,
        }).then(response => {
            dispatch({ type: FETCH_RESTAURANTS_SUCCESS, payload: response.data.data });
            dispatch({ type: SET_ARRAYHOLDER, payload: response.data.data });
        }).catch(() => {
            dispatch({ type: FETCH_RESTAURANTS_FAILED });
        });
    };
};

export const fetchTimeSlots = (restaurantId, day, date) => {
    return (dispatch) => {
        dispatch({ type: FETCH_TIME_SLOTS });
        axios({
            method: 'post',
            url: GET_TIME_SLOTS,
            data: {
                restaurant_id: restaurantId,
                day,
                date
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch({ type: FETCH_TIME_SLOTS_SUCCESS, payload: response.data.data });
                dispatch({ type: RESTAURANT_STATUS_UPDATES, payload: false });
            } else if (response.status === 202) {
                dispatch({ type: RESTAURANT_STATUS_UPDATES, payload: true });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: RESTAURANT_STATUS_UPDATES, payload: false });
                if (error.response.status === 500) {
                    dispatch({ type: FETCH_TIME_SLOTS_FAILED, payload: 'Time slots not available' });
                } else {
                    dispatch({ type: FETCH_TIME_SLOTS_FAILED, payload: 'Failed to load data' });
                }
            }
        });
    };
};

export const addBooking = (
    restaurantId,
    userId,
    date,
    timeSlot,
    guestCount,
    discount,
    fullName,
    email,
    contactNumber,
    timeSlotId,
    accessToken,
) => {
    return (dispatch) => {
        dispatch({ type: MAKE_RESERVATION });
        axios({
            method: 'post',
            url: CREATE_RESERVATION,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                restaurant_id: restaurantId,
                user_id: userId,
                date,
                time: timeSlot,
                guests_number: guestCount,
                discount,
                full_name: fullName,
                email,
                mobile_number: contactNumber,
                time_slot_id: timeSlotId
            }
        }).then(response => {
            dispatch({ type: MAKE_RESERVATION_SUCCESS, payload: response.data.data.reference_number });
            refreshBookingList(userId, accessToken, dispatch);
            refreshUpcomingBookings(userId, accessToken, dispatch);
        }).catch(error => {
            dispatch({ type: MAKE_RESERVATION_FAILED, payload: 'Something went wrong' });
        });
    };
};

export const resetReservationError = () => {
    return {
        type: RESET_RESERVATION_ERROR
    };
};

export const fetchBookingList = (userId, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_BOOKING_LIST });
        axios({
            method: 'get',
            url: `${GET_BOOKINGS}/${userId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            dispatch({ type: FETCH_BOOKING_LIST_SUCCESS, payload: response.data.data });
        }).catch(error => {
            dispatch({ type: FETCH_BOOKING_LIST_FAILED, payload: 'Failed to load data' });
        });
    };
};

const refreshBookingList = (userId, accessToken, dispatch) => {
    dispatch({ type: FETCH_BOOKING_LIST });
    axios({
        method: 'get',
        url: `${GET_BOOKINGS}/${userId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        dispatch({ type: FETCH_BOOKING_LIST_SUCCESS, payload: response.data.data });
    }).catch(error => {
        dispatch({ type: FETCH_BOOKING_LIST_FAILED, payload: 'Failed to load data' });
    });
};

export const searchFilterAction = (text, arrayHolder) => {
    const newData = arrayHolder.filter(item => {
        const itemDataName = item.name.toUpperCase();
        const itemDataAddress = item.address.toUpperCase();
        const textData = text.toUpperCase();
        return (itemDataName.indexOf(textData) > -1) || (itemDataAddress.indexOf(textData) > -1);
    });
    return (dispatch) => {
        dispatch({ type: SEARCH_FIELD_CHANGED, payload: newData });
    };
};

export const deleteBooking = (bookingId, userId, timeSlotId, accessToken) => {
    return (dispatch) => {
        dispatch({ type: DELETE_BOOKING });
        axios({
            method: 'delete',
            url: `${CREATE_RESERVATION}/${bookingId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                time_slot_id: timeSlotId
            }
        }).then(response => {
            dispatch({ type: DELETE_BOOKING_SUCCESS });
            refreshBookingList(userId, accessToken, dispatch);
            refreshUpcomingBookings(userId, accessToken, dispatch);
            resetBookingDeleteState(dispatch);
        }).catch(error => {
            dispatch({ type: DELETE_BOOKING_FAILED });
        });
    };
};

const resetBookingDeleteState = (dispatch) => {
    dispatch({ type: RESET_DELETE_STATE });
};

export const fetchUpcomingBookings = (userId, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_UPCOMING_BOOKINGS });
        axios({
            method: 'get',
            url: `${GET_UPCOMING_BOOKINGS}/${userId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        }).then(response => {
            dispatch({ type: FETCH_UPCOMING_BOOKINGS_SUCCESS, payload: response.data.data });
        }).catch(() => {
            dispatch({ type: FETCH_UPCOMING_BOOKINGS_FAILED });
        });
    };
};

const refreshUpcomingBookings = (userId, accessToken, dispatch) => {
    dispatch({ type: FETCH_UPCOMING_BOOKINGS });
    axios({
        method: 'get',
        url: `${GET_UPCOMING_BOOKINGS}/${userId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }).then(response => {
        dispatch({ type: FETCH_UPCOMING_BOOKINGS_SUCCESS, payload: response.data.data });
    }).catch(() => {
        dispatch({ type: FETCH_UPCOMING_BOOKINGS_FAILED });
    });
};
