import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import UserChat from './User/UserChat';

const ProtectRoutes = (admin) => {

    if(admin){
      let adminAuth = true;
      return adminAuth ? <Outlet />:<Navigate to='/login' />
    }else{
      let userAuth = true;
      return userAuth ? <>
                                  <Outlet />
                                  <UserChat />
                                  </>
                                  :<Navigate to='/login' />
    }

}

export default ProtectRoutes