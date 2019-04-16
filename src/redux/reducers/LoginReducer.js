import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    USER_IS_LOGGED_IN,
    CHECK_FORCE_UPDATE,
    CHECK_FORCE_UPDATE_SUCCESS,
    CHECK_FORCE_UPDATE_FAILED,
} from '../types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: {},
    loginLoading: false,
    isLoggedIn: false,
    isUpdateAvailable: false,
    checkUpdateLoading: false,
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
        case CHECK_FORCE_UPDATE:
            return { ...state, checkUpdateLoading: true };
        case CHECK_FORCE_UPDATE_SUCCESS:
            return { ...state, checkUpdateLoading: false, isUpdateAvailable: action.payload };
        case CHECK_FORCE_UPDATE_FAILED:
            return { ...state, checkUpdateLoading: false };
        default:
            return state;
    }
};
