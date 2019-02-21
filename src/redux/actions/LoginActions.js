import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
} from '../types';

export const loginEmailChanged = (email) => {
    return {
        type: LOGIN_EMAIL_CHANGED,
        payload: email
    };
};

export const loginPasswordChanged = (password) => {
    return {
        type: LOGIN_PASSWORD_CHANGED,
        payload: password
    };
};
