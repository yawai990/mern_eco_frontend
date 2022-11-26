import { LOGIN_USER, LOGOUT_USER } from "../constants/user";
import axios from 'axios';

export const setReduxUserState = ( userData ) => dispatch =>{
    dispatch({
        type:LOGIN_USER,
        payload : userData
    })
};

export const logout = () =>dispatch =>{
    
    document.location.href = '/login';

    axios.get('/api/logout')

    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('userInfo')
    localStorage.removeItem('cart');

    dispatch({
        type : LOGOUT_USER,
    })
}