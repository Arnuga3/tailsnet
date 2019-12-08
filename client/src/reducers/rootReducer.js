import { combineReducers } from 'redux';
import notificationStore from './notificationReducer';
import authStore from './authReducer';
import petStore from './petReducer';
import userStore from './userReducer';

export default combineReducers({
    notificationStore,
    authStore,
    petStore,
    userStore
});