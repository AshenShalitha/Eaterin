import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED
} from '../types';

const INITIAL_STATE = {
    email: '',
    password: '',
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case LOGIN_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        default:
            return state;
    }
};
