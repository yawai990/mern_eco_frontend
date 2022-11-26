import UserProfileCom from './components/userProfile';
import { useSelector, useDispatch } from 'react-redux';
import { setReduxUserState } from '../../redux/actions/user';
import axios from 'axios';

const UserProfile = () => {
  const userInfo = useSelector(state => state.userRegisterLogin.userInfo);
  const reduxDispatch = useDispatch();

  const userUpdate = async (updateData) => {
     const { data } = await axios.put('/api/users/profile', updateData);

      return data;

  };

  const getUser = async ( id ) =>{
    const { data } = await axios.get(`/api/users/profile/${id}`);

    return data;
  }

  return <UserProfileCom userInfo={userInfo} 
  userUpdate={userUpdate} getUser={getUser}
  reduxDispatch={reduxDispatch}  setReduxUserState={setReduxUserState}
  />
}

export default UserProfile ;