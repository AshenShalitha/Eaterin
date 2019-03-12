import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import BookingReducer from './BookingReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    booking: BookingReducer,
    profile: ProfileReducer,
});
