import axios from "axios"
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';



//load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
        
    }
}



//register user

export const register = ({ username, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, password })

    try {
        const res = await axios.post('http://localhost:5000/api/users', body,config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: REGISTER_FAIL
        })

    }
}