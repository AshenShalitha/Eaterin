import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';

export default combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
});
