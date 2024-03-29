import api from '../utils/api';
import {
    ADD_LIMITS,
    GET_ALL_LIMITS,
    LIMIT_ERROR
} from './types'

export const getAllLimits = () => async dispatch => {
    try {

        const res = await api.get('/limitation')

        dispatch({
            type: GET_ALL_LIMITS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: LIMIT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

export function useGetLimits() {

    const getLimits = async () => {
        try {

            const res = await api.get('/limitation')

            return res.data
        
        } catch (err) {

            console.error(err)

        }
    }
    return getLimits
}

export const addLimits = (prev, swantCount, prevLeft, swantLeft, count) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let data = {
        prev: prev,
        swantCount: swantCount,
        rewindsleft: prevLeft,
        superwantleft: swantLeft,
        count: count
    }

    try {

        const res = await api.post('/limitation', data, config)

        dispatch({
            type: ADD_LIMITS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: LIMIT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}