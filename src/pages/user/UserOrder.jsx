import UserOrderCom from "./components/userOrderPage"
import axios from 'axios';

const getOrders = async()=>{
  const { data } = await axios.get('/api/orders');

  return data;
}

const UserOrder = () => {
  return <UserOrderCom getOrders={getOrders} />
}

export default UserOrder