import { combineReducers } from 'redux';
import petStore from './petReducer';
import userStore from './userReducer';

export default combineReducers({
    petStore,
    userStore
});