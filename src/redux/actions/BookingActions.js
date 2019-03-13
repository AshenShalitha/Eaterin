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
    FETCH_TIME_SLOTS_FAILED
} from '../types';
import {
    GET_RESTAURANTS,
    GET_TIME_SLOTS,
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

export const fetchRestaurants = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_RESTAURANTS });
        axios({
            method: 'get',
            url: GET_RESTAURANTS,
        }).then(response => {
            dispatch({ type: FETCH_RESTAURANTS_SUCCESS, payload: response.data.data });
        }).catch(() => {
            dispatch({ type: FETCH_RESTAURANTS_FAILED });
        });
    };
};

export const fetchTimeSlots = (restaurantId, date) => {
    // console.log(date)
    return (dispatch) => {
        dispatch({ type: FETCH_TIME_SLOTS });
        axios({
            method: 'post',
            url: GET_TIME_SLOTS,
            data: {
                restaurant_id: restaurantId,
                day: date
            }
        }).then(response => {
            dispatch({ type: FETCH_TIME_SLOTS_SUCCESS, payload: response.data.data });
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch({ type: FETCH_TIME_SLOTS_FAILED, payload: 'Time slots not available' });
                } else {
                    dispatch({ type: FETCH_TIME_SLOTS_FAILED, payload: 'Failed to load data' });
                }
            }
        });
    };
};
