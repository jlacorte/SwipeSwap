import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTION_USERS,
    GET_USER_WANT_TRANSACTION,
    GET_CHAT,
    GET_CHATS,
    SET_DATE_TRANS,
    APPROVE,
    TRANSACTION_ERROR,
    GET_USER_WANT_1,
    GET_USER_WANT_2
} from './types';

const url = "http://localhost:5000";

// @route   GET transaction/
// @des     Get all transaction from user
// @access  Private
export const getAllTransaction = () => async dispatch => {
    try {

        const res = await axios.get(`${url}/api/transaction`);

        dispatch({
            type: GET_TRANSACTIONS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET transaction/
// @des     Get all transaction from user
// @access  Private
export const getUserWantTransaction = () => async dispatch => {
    try {

        const res = await axios.get(`${url}/api/want/`);

        dispatch({
            type: GET_USER_WANT_TRANSACTION,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET transaction/
// @des     Get all transaction from user
// @access  Private
export const getUserWant1 = () => async dispatch => {
    try {

        const res = await axios.get(`${url}/api/want/user/1`);

        dispatch({
            type: GET_USER_WANT_1,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET transaction/
// @des     Get all transaction from user
// @access  Private
export const getUserWant2 = () => async dispatch => {
    try {

        const res = await axios.get(`${url}/api/want/want/user/2`);

        dispatch({
            type: GET_USER_WANT_2,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET api/transaction/:id
// @des     Get all transaction from user
// @access  Private
export const getTrans = trans_id => async dispatch => {
    try {
        
        const res = await axios.get(`${url}/api/transaction/trans/chat/get/conv/${trans_id}`);

        dispatch({
            type: GET_CHATS,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// @route   GET api/transaction/match/chat/users/:id
// @des     Get all users by transaction
// @access  Private
export const getTransactionUsers = trans_id => async dispatch => {
    try {
        
        const res = await axios.get(`${url}/api/transaction/match/chat/users/${trans_id}`);

        dispatch({
            type: GET_TRANSACTION_USERS,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// @route   POST api/transaction/swapped/:item_id
// @des     Get all users by transaction
// @access  Private
export const approve = item_id => async dispatch => {
    try {
        
        const res = await axios.post(`${url}/api/transaction/swapped/${item_id}`);

        dispatch({
            type: GET_TRANSACTION_USERS,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}
