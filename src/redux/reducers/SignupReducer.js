import {
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_NAME_CHANGED,
    SIGNUP_CONTACT_NUMBER_CHANGED,
    SIGNUP_CONFIRM_PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
} from '../types';

const INITIAL_STATE = {
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    signupError: '',
    signupLoading: false,
    user: {},
    signupSuccess: false,
};

const SIGNUP_FORM_INITIAL_STATE = {
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    signupError: '',
    signupLoading: false,
    user: {},
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
        case SIGNUP_USER:
            return { ...state, signupLoading: true };
        case SIGNUP_USER_SUCCESS:
            return { ...state, signupLoading: false, signupSuccess: true, ...SIGNUP_FORM_INITIAL_STATE };
        case SIGNUP_USER_FAILED:
            return { ...state, signupLoading: false, signupSuccess: false };
        default:
            return state;
    }
};

