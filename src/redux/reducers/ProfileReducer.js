import {
    UPDATE_PROFILE_PICTURE,
    UPDATE_PROFILE_PICTURE_SUCCESS,
    UPDATE_PROFILE_PICTURE_FAILED,
    PROFILE_NAME_CHANGED,
    PROFILE_CONTACT_NO_CHANGED,
    PROFILE_OLD_PASSWORD_CHANGED,
    PROFILE_NEW_PASSWORD_CHANGED,
    PROFILE_CONFIRM_PASSWORD_CHANGED,
    PROFILE_ENABLE_NAME_BUTTON,
    PROFILE_ENABLE_CONTACT_BUTTON,
    PROFILE_UPDATE,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILED,
    SET_ID,
    SET_NAME,
    SET_EMAIL,
    SET_CONTACT_NUMBER,
    SET_PROFILE_PIC,
    SET_ACCESS_TOKEN,
    PROFILE_DISABLE_CONTACT_BUTTON,
    PROFILE_ENABLE_PASSWORD_CHANGE_BUTTON,
    PROFILE_DISABLE_PASSWORD_CHANGE_BUTTON,
    PROFILE_PASSWORD_CHANGE,
    PROFILE_PASSWORD_CHANGE_SUCCESS,
    PROFILE_PASSWORD_CHANGE_FAILED,
    PROFILE_RESET_PASSOWRD_ERROR
} from '../types';
import { colors } from '../../utils/Colors';

const INITIAL_STATE = {
    id: '',
    name: '',
    email: '',
    contactNo: '',
    profilePic: null,
    accessToken: '',

    profilePicUpdateLoading: false,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    colorName: colors.ash_dark,
    disabledName: true,
    colorContact: colors.ash_dark,
    disabledContact: true,
    colorPasswordChange: colors.ash_dark,
    disabledPasswordChange: true,
    profileUpdateLoading: false,
    profileUpdateError: '',
    passwordChangeLoading: false,
    passwordChangeError: false,
    passwordChangeErrorMessage: '',
};

const NAME_BUTTON_DISABLED_STATE = {
    colorName: colors.ash_dark,
    disabledName: true
};

const CONTACT_BUTTON_DISABLED_STATE = {
    colorContact: colors.ash_dark,
    disabledContact: true
};

const NAME_BUTTON_ENABLED_STATE = {
    colorName: colors.green_light,
    disabledName: false
};

const CONTACT_BUTTON_ENABLED_STATE = {
    colorContact: colors.green_light,
    disabledContact: false
};

const PASSWORD_CHANGE_BUTTON_ENABLE_STATE = {
    colorPasswordChange: colors.green_light,
    disabledPasswordChange: false,
};

const PASSWORD_CHANGE_BUTTON_DISABLE_STATE = {
    colorPasswordChange: colors.ash,
    disabledPasswordChange: true,
};

const PASSWORD_ERROR_RESET_STATE = {
    passwordChangeError: false,
    passwordChangeErrorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ID:
            return { ...state, id: action.payload };
        case SET_NAME:
            return { ...state, name: action.payload };
        case SET_EMAIL:
            return { ...state, email: action.payload };
        case SET_CONTACT_NUMBER:
            return { ...state, contactNo: action.payload };
        case SET_PROFILE_PIC:
            return { ...state, profilePic: action.payload };
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload };
        case UPDATE_PROFILE_PICTURE:
            return { ...state, profilePicUpdateLoading: true };
        case UPDATE_PROFILE_PICTURE_SUCCESS:
            return { ...state, profilePicUpdateLoading: false, profilePic: action.payload };
        case UPDATE_PROFILE_PICTURE_FAILED:
            return { ...state, profilePicUpdateLoading: false };
        case PROFILE_NAME_CHANGED:
            return { ...state, name: action.payload };
        case PROFILE_CONTACT_NO_CHANGED:
            return { ...state, contactNo: action.payload };
        case PROFILE_OLD_PASSWORD_CHANGED:
            return { ...state, oldPassword: action.payload };
        case PROFILE_NEW_PASSWORD_CHANGED:
            return { ...state, newPassword: action.payload };
        case PROFILE_CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case PROFILE_ENABLE_NAME_BUTTON:
            return { ...state, ...NAME_BUTTON_ENABLED_STATE };
        case PROFILE_ENABLE_CONTACT_BUTTON:
            return { ...state, ...CONTACT_BUTTON_ENABLED_STATE };
        case PROFILE_DISABLE_CONTACT_BUTTON:
            return { ...state, ...CONTACT_BUTTON_DISABLED_STATE };
        case PROFILE_ENABLE_PASSWORD_CHANGE_BUTTON:
            return { ...state, ...PASSWORD_CHANGE_BUTTON_ENABLE_STATE };
        case PROFILE_DISABLE_PASSWORD_CHANGE_BUTTON:
            return { ...state, ...PASSWORD_CHANGE_BUTTON_DISABLE_STATE };
        case PROFILE_UPDATE:
            return { ...state, profileUpdateLoading: true };
        case PROFILE_UPDATE_SUCCESS:
            return { ...state, profileUpdateLoading: false, ...NAME_BUTTON_DISABLED_STATE, ...CONTACT_BUTTON_DISABLED_STATE };
        case PROFILE_UPDATE_FAILED:
            return { ...state, profileUpdateLoading: false, profileUpdateError: action.payload, ...NAME_BUTTON_DISABLED_STATE, ...CONTACT_BUTTON_DISABLED_STATE };
        case PROFILE_PASSWORD_CHANGE:
            return { ...state, passwordChangeLoading: true };
        case PROFILE_PASSWORD_CHANGE_SUCCESS:
            return { ...state, passwordChangeLoading: false, ...PASSWORD_CHANGE_BUTTON_DISABLE_STATE, passwordChangeError: false };
        case PROFILE_PASSWORD_CHANGE_FAILED:
            return { ...state, passwordChangeLoading: false, passwordChangeError: true, passwordChangeErrorMessage: action.payload };
        case PROFILE_RESET_PASSOWRD_ERROR:
            return { ...state, ...PASSWORD_ERROR_RESET_STATE };
        default:
            return state;
    }
};
