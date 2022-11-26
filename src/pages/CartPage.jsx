import CartPageCom from './user/components/CartPageCom';
import { useSelector, useDispatch  } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartAction';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartSubtotal = useSelector(state => state.cart.cartSubtotal);
  const reduxDispatch = useDispatch();

  return  <CartPageCom
                cartItems={cartItems}
                cartSubtotal={cartSubtotal}
                reduxDispatch={reduxDispatch}
                addToCart={addToCart}
                removeFromCart = {removeFromCart}
                />
}

export default CartPage