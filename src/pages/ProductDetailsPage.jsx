import ProductDetailsPageCom from './user/components/ProductDetailsCom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';

const getProduct = async(id)=>{
 const {data} = await axios.get(`/api/products/get-one/${id}`);

 return data;
}


const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  return <ProductDetailsPageCom 
  getProduct={getProduct} 
  reduxDispatch={dispatch} 
  addToCart = {addToCart}
  />  
}

export default ProductDetailsPage