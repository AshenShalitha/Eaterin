import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    USER_IS_LOGGED_IN,
    SET_PROFILE_PIC,
    SET_ACCESS_TOKEN,
    SET_CONTACT_NUMBER,
    SET_EMAIL,
    SET_NAME,
    SET_ID,
    CHECK_FORCE_UPDATE,
    CHECK_FORCE_UPDATE_SUCCESS,
    CHECK_FORCE_UPDATE_FAILED
} from '../types';
import {
    LOGIN, CHECK_UPDATE,
} from '../../api/API';
import NavigationService from '../../services/NavigationService';

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

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        axios({
            method: 'post',
            url: LOGIN,
            data: {
                email,
                password
            }
        }).then(response => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.data });
            AsyncStorage.setItem('accessToken', response.data.data.access_token);
            AsyncStorage.setItem('id', response.data.data.user_id.toString());
            AsyncStorage.setItem('name', response.data.data.name);
            AsyncStorage.setItem('email', response.data.data.email);
            AsyncStorage.setItem('mobileNumber', response.data.data.mobile_number);
            AsyncStorage.setItem('imageUrl', response.data.data.image_url);
            setId(response.data.data.user_id.toString(), dispatch);
            setName(response.data.data.name, dispatch);
            setEmail(response.data.data.email, dispatch);
            setContactNumber(response.data.data.mobile_number, dispatch);
            setProfilePic(response.data.data.image_url, dispatch);
            setAccessToken(response.data.data.access_token, dispatch);
            NavigationService.navigate('App');
        }).catch(error => {
            dispatch({ type: LOGIN_USER_FAILED });
            if (error.response) {
                if (error.response.status === 422) {
                    Alert.alert(
                        'Login Failed!',
                        error.response.data.errors[0].detail,
                        [
                            { text: 'Ok' },
                        ],
                    );
                } else if (error.response.status === 500) {
                    Alert.alert(
                        'Login Failed!',
                        error.response.data.errors.detail,
                        [
                            { text: 'Ok' },
                        ],
                    );
                } else {
                    Alert.alert(
                        'Login Failed!',
                        'Something went wrong',
                        [
                            { text: 'Ok' },
                        ],
                    );
                }
            } else if (error.request) {
                Alert.alert(
                    'Login Failed!',
                    'Server eror, Please try again later.',
                    [
                        { text: 'Ok' },
                    ],
                );
            } else {
                Alert.alert(
                    'Login Failed!',
                    'Something went wrong',
                    [
                        { text: 'Ok' },
                    ],
                );
            }
        });
    };
};

export const checkLoggedInStatus = (status) => {
    return {
        type: USER_IS_LOGGED_IN,
        payload: status
    };
};

const setId = (value, dispatch) => {
    dispatch({ type: SET_ID, payload: value });
};

const setName = (value, dispatch) => {
    dispatch({ type: SET_NAME, payload: value });
};

const setEmail = (value, dispatch) => {
    dispatch({ type: SET_EMAIL, payload: value });
};

const setContactNumber = (value, dispatch) => {
    dispatch({ type: SET_CONTACT_NUMBER, payload: value });
};

const setProfilePic = (value, dispatch) => {
    dispatch({ type: SET_PROFILE_PIC, payload: value });
};

const setAccessToken = (value, dispatch) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: value });
};

export const checkUpdate = (platform, version) => {
    console.log(platform, version);
    return (dispatch) => {
        dispatch({ type: CHECK_FORCE_UPDATE });
        axios({
            method: 'post',
            url: CHECK_UPDATE,
            data: {
                client: platform,
                current_version: version
            }
        }).then(response => {
            console.log(response.data)
            if (response.data.data.update_available === 1) {
                dispatch({ type: CHECK_FORCE_UPDATE_SUCCESS, payload: true });
            } else {
                dispatch({ type: CHECK_FORCE_UPDATE_SUCCESS, payload: false });
            }
        }).catch(() => {
            dispatch({ type: CHECK_FORCE_UPDATE_FAILED });
        });
    };
};
