import Order from "./components/Order";
import axios from 'axios';

const fetchOrders = async ( abctl ) =>{
  const { data } = await axios.get('/api/orders/admin', {
    signal : abctl.signal
  });
  
  return data;
}

const AdminOrders = () => {
  return <Order fetchOrders={fetchOrders} />
}

export default AdminOrders