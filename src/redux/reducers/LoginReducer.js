import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    USER_IS_LOGGED_IN,
} from '../types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: {},
    loginLoading: false,
    isLoggedIn: false,
};

const FORM_INITIAL_STATE = {
    email: '',
    password: '',
    loginLoading: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case LOGIN_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loginLoading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loginLoading: false, ...FORM_INITIAL_STATE };
        case LOGIN_USER_FAILED:
            return { ...state, loginLoading: false };
        case USER_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
};
