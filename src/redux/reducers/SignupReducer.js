import {
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_NAME_CHANGED,
    SIGNUP_CONTACT_NUMBER_CHANGED,
    SIGNUP_CONFIRM_PASSWORD_CHANGED
} from '../types';

const INITIAL_STATE = {
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_NAME_CHANGED:
            return { ...state, name: action.payload };
        case SIGNUP_CONTACT_NUMBER_CHANGED:
            return { ...state, contactNumber: action.payload };
        case SIGNUP_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case SIGNUP_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case SIGNUP_CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }
};
