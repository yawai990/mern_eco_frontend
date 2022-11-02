import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';

const ProtectRoutes = (admin) => {
    let auth = false;

    if(admin){
      let adminAuth = false;
      if(adminAuth) auth=true;
    }else{
      let userAuth = true;
      if(userAuth) auth= true;
    }

    //Outlet means the childs elements of this routes
  return auth ? <Outlet />:<Navigate to='/login' />
}

export default ProtectRoutes