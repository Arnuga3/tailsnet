import { combineReducers } from 'redux';
import authStore from './authReducer';
import petStore from './petReducer';
import userStore from './userReducer';

export default combineReducers({
    authStore,
    petStore,
    userStore
});