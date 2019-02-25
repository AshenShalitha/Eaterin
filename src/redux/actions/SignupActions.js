import {
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_NAME_CHANGED,
    SIGNUP_CONTACT_NUMBER_CHANGED,
    SIGNUP_CONFIRM_PASSWORD_CHANGED,
} from '../types';

export const signupNameChanged = (name) => {
    return {
        type: SIGNUP_NAME_CHANGED,
        payload: name
    };
};

export const signupContactNumberChanged = (contactNumber) => {
    return {
        type: SIGNUP_CONTACT_NUMBER_CHANGED,
        payload: contactNumber
    };
};

export const signupEmailChanged = (email) => {
    return {
        type: SIGNUP_EMAIL_CHANGED,
        payload: email
    };
};

export const signupPasswordChanged = (password) => {
    return {
        type: SIGNUP_PASSWORD_CHANGED,
        payload: password
    };
};

export const signupConfirmPasswordChanged = (confirmPassword) => {
    return {
        type: SIGNUP_CONFIRM_PASSWORD_CHANGED,
        payload: confirmPassword
    };
};
