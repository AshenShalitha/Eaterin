import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import BookingReducer from './BookingReducer';

export default combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    booking: BookingReducer,
});
