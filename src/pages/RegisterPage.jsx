import axios from 'axios';
import RegisterPageComponent from './components/Register';

const registerUser = async (createUserData) =>{

  const { data } = await axios.post('/api/users/register', createUserData);

  //save to the session storage
  sessionStorage.setItem('userInfo',JSON.stringify(data.userCreated));

  return data;
}

const RegisterPage = () => {
    return <RegisterPageComponent registerUser={registerUser} />
}

export default RegisterPage