import React,{useEffect,useState} from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import UserChat from './User/UserChat';
import LoginPage from '../pages/LoginPage';
import axios from 'axios';

const ProtectRoutes = ({ admin }) => {

  const [ isAuth, setIsAuth ] = useState();

    useEffect(()=>{
      axios.get('/api/get-token')
      .then(resp => {
        setIsAuth(resp.data.token)
      });
      return isAuth;
    },[])

    if(isAuth === undefined) return <LoginPage />;

    return isAuth && admin && isAuth !== 'admin' ? (
      <Navigate to='/login' />
    ): isAuth && admin ? (
      <Outlet />
    ): 
    // this is for normal user
    isAuth && !admin ? (
      <>
      <UserChat />
      <Outlet />
      </>
    ): <Navigate to='/login' />
}
 
export default ProtectRoutes;