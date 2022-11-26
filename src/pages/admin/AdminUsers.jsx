import UserPage from './components/UserPage';
import axios from 'axios';

const fetchUsers = async (abctl)=>{
  const { data } = await axios.get('/api/users', {
    signal: abctl.signal
  });

 return data
};

const deleteUser = async ( userId ) =>{
  const { data } = await axios.delete(`/api/users/${userId}`);

  return data;
}

const AdminUsers = () => {

    return <UserPage fetchUsers={fetchUsers} deleteUser={deleteUser} />
}

export default AdminUsers