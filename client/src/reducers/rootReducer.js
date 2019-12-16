import { combineReducers } from 'redux';
import notificationStore from './notificationReducer';
import petStore from './petReducer';
import userStore from './userReducer';

export default combineReducers({
    notificationStore,
    petStore,
    userStore
});