import UserOrderDetailsCom from "./components/UserOrderDetail";
import axios from 'axios';
import { useSelector } from "react-redux";
import { loadScript } from "@paypal/paypal-js";


const onCancelHandler =()=>{
  console.log('cancel')
};

const onErrorHandler =()=>{
  console.log('error')
};

const buttons = ( cartSubtotal, cartItems, id , updateStateAfterOrder) =>{
  return {
    createOrder: (data,actions) => {

      const orderPaymentLoad = {
        purchase_units :[
          {
             amount : { 
              currency_code:"USD",
             value : cartSubtotal ,
             breakdown : {
              item_total : {
                    currency_code : 'USD',
                    value : cartSubtotal
              }
           },
            },
             items : cartItems.map(product => ({
                   name : product.name,
                  unit_amount : {
                    currency_code : 'USD',
                    value : product.price
                  },
                  quantity : product.quantity
                }))
             }]
      };
      return actions.order.create(orderPaymentLoad)
    },
    onCancel:  onCancelHandler,
    onApprove : (data, actions) =>{
      return actions.order.capture()
                .then(orderData => {

                  var transaction = orderData.purchase_units[0].payments.captures[0];

                  
                  if(transaction.status ==="COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)){
                    updateOrder(id)
                    .then(resp => {
                      if(resp.isPaid){
                        updateStateAfterOrder(resp.paidAt)
                      }
                    })
                  }
                })
    },
    onError : onErrorHandler
  }
};

const updateOrder = async (orderId) => {
  const { data } =await axios.put(`/api/orders/product/${orderId}`)

  return data;
}

const UserOrderDetails = () => {

  const userInfo = useSelector(state => state.userRegisterLogin.userInfo);

  const getUser = async (id)=>{
    const {data} = await axios.get(`/api/users/profile/${id}`);

    return data;
  };

  const getOrder = async (orderId) =>{
    const { data } = await axios.get(`/api/orders/user/${orderId}`);

    return data;
  };

  const loadPaypalScript = ( cartSubtotal, cartItems, id , updateStateAfterOrder) =>{
    loadScript({ "client-id": "AbSLkELwqf0O3W6MFzP8Z-ZKONVTGBkG_ObCiVaTMfZX3pxC3-HiY7tPQg4i1LeFKX4KqukV7mkD_vG6" })
    .then(paypal =>{
      paypal
      .Buttons(buttons( cartSubtotal, cartItems, id , updateStateAfterOrder))
      .render("#paypal-container-element");
    })
    .catch(err => console.error('Failed to load the Paypal SDK',err))
  };



  return <UserOrderDetailsCom userInfo={userInfo} getUser={getUser}
                getOrder={getOrder} loadScript={loadScript} loadPaypalScript={loadPaypalScript}
                    />
}

export default UserOrderDetails