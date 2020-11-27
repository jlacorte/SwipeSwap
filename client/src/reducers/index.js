import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import item from './item';
import transaction from './transaction';
import match from './match';
import chat from './chat';

export default combineReducers({
    alert,
    auth,
    profile,
    item,
    transaction,
    match,
    chat
});