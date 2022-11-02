import React from 'react';
import {Outlet} from 'react-router-dom'
import UserChat from './UserChat';

const UserChatRoute = () => {
  return (
    <>
    <UserChat />
    <Outlet />
    </>
  )
}

export default UserChatRoute