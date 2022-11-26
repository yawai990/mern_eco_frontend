import axios from "axios";
import OrderDetail from "./components/OrderDetail";

const fetchSpecificOrder = async ( id ) =>{
  const { data } = await axios.get(`/api/orders/user/${id}`);

  return data;
};


const markAsDelivered = async ( id ) =>{
    const { data } = await axios.put(`/api/orders/delivered/${id}`);

   if(data) return data;
}


const AdminOrderDetails = () => {
  return <OrderDetail fetchSpecificOrder={fetchSpecificOrder} markAsDelivered={markAsDelivered} />
  }

export default AdminOrderDetails