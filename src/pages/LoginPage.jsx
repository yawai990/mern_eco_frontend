import LoginPageComponent from './components/LoginPage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReduxUserState } from '../redux/actions/user';

const LoginPageApiRequest = async ( email,password, doNotLogout) =>{
  const { data } = await axios.post('/api/users/login', { email,  password, doNotLogout });

  if(data.userLoggedIn.doNotLogout) localStorage.setItem('userInfo', JSON.stringify(data.userLoggedIn))
  else sessionStorage.setItem('userInfo', JSON.stringify(data.userLoggedIn))

  return data;
}

const LoginPage = () => {
  const reduxDispatch = useDispatch();

   return <LoginPageComponent LoginPageApiRequest={LoginPageApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState}  />
}

export default LoginPage