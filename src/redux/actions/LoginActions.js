import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../types';
import {
    LOGIN,
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
            AsyncStorage.setItem('mobile_number', response.data.data.mobile_number);
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

