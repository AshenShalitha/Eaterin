import { Alert } from 'react-native';
import axios from 'axios';
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
import { SIGNUP } from '../../api/API';
import NavigationService from '../../services/NavigationService';

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

export const signupUser = (name, email, contactNumber, password) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });
        axios({
            method: 'post',
            url: SIGNUP,
            data: {
                name,
                email,
                mobile_number: contactNumber,
                password
            }
        }).then(() => {
            Alert.alert(
                'Registration Successful!',
                'Please verify your email address to proceed.',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            NavigationService.replace('LoginScreen');
                        }
                    },
                ],
                { cancelable: false },
            );
            dispatch({ type: SIGNUP_USER_SUCCESS });
        }).catch(error => {
            dispatch({ type: SIGNUP_USER_FAILED });
            if (error.response) {
                if (error.response.status === 422) {
                    Alert.alert(
                        'Registration Failed!',
                        error.response.data.errors[0].detail,
                        [
                            { text: 'Ok' },
                        ],
                    );
                } else {
                    Alert.alert(
                        'Registration Failed!',
                        'Something went wrong',
                        [
                            { text: 'Ok' },
                        ],
                    );
                }
            } else if (error.request) {
                Alert.alert(
                    'Registration Failed!',
                    'Server eror, Please try again later.',
                    [
                        { text: 'Ok' },
                    ],
                );
            } else {
                Alert.alert(
                    'Registration Failed!',
                    'Something went wrong',
                    [
                        { text: 'Ok' },
                    ],
                );
            }
        });
    };
};
