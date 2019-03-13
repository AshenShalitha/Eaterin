import axios from 'axios';
import { AsyncStorage } from 'react-native';
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
    SET_EMAIL,
    SET_NAME,
    SET_CONTACT_NUMBER,
    SET_PROFILE_PIC,
    SET_ACCESS_TOKEN,
    PROFILE_DISABLE_CONTACT_BUTTON,
    PROFILE_DISABLE_PASSWORD_CHANGE_BUTTON,
    PROFILE_ENABLE_PASSWORD_CHANGE_BUTTON,
    PROFILE_PASSWORD_CHANGE,
    PROFILE_PASSWORD_CHANGE_SUCCESS,
    PROFILE_PASSWORD_CHANGE_FAILED,
    PROFILE_RESET_PASSOWRD_ERROR
} from '../types';
import {
    POST_PROFILE_PICTURE,
    UPDATE_USER,
    CHANGE_PASSWORD
} from '../../api/API';

export const setId = value => {
    return {
        type: SET_ID,
        payload: value
    };
};

export const setName = value => {
    return {
        type: SET_NAME,
        payload: value
    };
};

export const setEmail = value => {
    return {
        type: SET_EMAIL,
        payload: value
    };
};

export const setContactNumber = value => {
    return {
        type: SET_CONTACT_NUMBER,
        payload: value
    };
};

export const setProfilePic = value => {
    return {
        type: SET_PROFILE_PIC,
        payload: value
    };
};

export const setAccessToken = value => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: value
    };
};

export const nameChanged = value => {
    return {
        type: PROFILE_NAME_CHANGED,
        payload: value
    };
};

export const contactNoChanged = value => {
    return {
        type: PROFILE_CONTACT_NO_CHANGED,
        payload: value
    };
};

export const oldPasswordChanged = value => {
    return {
        type: PROFILE_OLD_PASSWORD_CHANGED,
        payload: value
    };
};

export const newPasswordChanged = value => {
    return {
        type: PROFILE_NEW_PASSWORD_CHANGED,
        payload: value
    };
};

export const confirmPasswordChanged = value => {
    return {
        type: PROFILE_CONFIRM_PASSWORD_CHANGED,
        payload: value
    };
};

export const enableNameButton = () => {
    return {
        type: PROFILE_ENABLE_NAME_BUTTON
    };
};

export const enableContactButton = () => {
    return {
        type: PROFILE_ENABLE_CONTACT_BUTTON
    };
};

export const disableContactButton = () => {
    return {
        type: PROFILE_DISABLE_CONTACT_BUTTON
    };
};

export const disablePasswordChangeButton = () => {
    return {
        type: PROFILE_DISABLE_PASSWORD_CHANGE_BUTTON
    };
};

export const enablePasswordChangeButton = () => {
    return {
        type: PROFILE_ENABLE_PASSWORD_CHANGE_BUTTON
    };
};

export const updateProfilePicture = (fileName, fileType, fileUri, userId, accessToken) => {
    const file = {
        uri: fileUri,
        name: fileName,
        type: fileType,
    };

    const formData = new FormData();
    formData.append('profile_picture', file);
    formData.append('user_id', userId);

    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_PICTURE });
        axios({
            method: 'post',
            url: POST_PROFILE_PICTURE,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: formData
        }).then(response => {
            dispatch({ type: UPDATE_PROFILE_PICTURE_SUCCESS, payload: response.data.data.image_url });
            AsyncStorage.setItem('imageUrl', response.data.data.image_url);
        }).catch((error) => {
            dispatch({ type: UPDATE_PROFILE_PICTURE_FAILED });
        });
    };
};

export const updateProfile = (name, contactNo, id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: PROFILE_UPDATE });
        axios({
            method: 'put',
            url: `${UPDATE_USER}${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                name,
                mobile_number: contactNo
            }
        }).then(response => {
            dispatch({ type: PROFILE_UPDATE_SUCCESS });
            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('mobileNumber', contactNo);
            console.log(response.data);
        }).catch(error => {
            dispatch({ type: PROFILE_UPDATE_FAILED, payload: error.data });
            console.log(error.response);
        });
    };
};

export const changePassword = (userId, oldPassword, newPassword, confirmPassword, accessToken) => {
    return (dispatch) => {
        dispatch({ type: PROFILE_PASSWORD_CHANGE });
        axios({
            method: 'put',
            url: CHANGE_PASSWORD,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                user_id: userId,
                old_password: oldPassword,
                password: newPassword,
                confirm_password: confirmPassword
            }
        }).then(response => {
            dispatch({ type: PROFILE_PASSWORD_CHANGE_SUCCESS });
            console.log(response.data)
        }).catch(error => {
            dispatch({ type: PROFILE_PASSWORD_CHANGE_FAILED, payload: error.response.data.errors.detail });
            console.log(error.response);
        })
    };
};

export const resetPaswordChangeError = () => {
    return {
        type: PROFILE_RESET_PASSOWRD_ERROR,
    };
};