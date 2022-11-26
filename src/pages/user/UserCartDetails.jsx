import CartDetailCom from './components/CartDetailCom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartAction';
import axios from 'axios';

const UserCartDetails = () => {
  const reduxDispatch= useDispatch();

  const cartItems =useSelector(state=>state.cart.cartItems);
  const quantity = useSelector(state=>state.cart.itemsCount)
  const cartSubtotal = useSelector(state=>state.cart.cartSubtotal);
  const userInfo = useSelector(state=>state.userRegisterLogin.userInfo);

  const getUser = async (id) => {
    const {data} = await axios.get(`/api/users/profile/${id}`)

    return data;
  };

  const createOrder = async (orderData) =>{
    const { data } = await axios.post('/api/orders' , orderData );

    return data;
  }

  return <CartDetailCom 
                cartItems={cartItems} quantity={quantity} cartSubtotal={cartSubtotal}
                addToCart={addToCart} removeFromCart={removeFromCart} reduxDispatch={reduxDispatch}
                userInfo={userInfo} getUser={getUser} createOrder={createOrder}
  />
}

export default UserCartDetails