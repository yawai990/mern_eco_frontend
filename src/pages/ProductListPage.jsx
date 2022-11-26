import ProductListPageCom from './user/components/ProductListCom';
import axios from 'axios';

const fetchProducts = async(pageNum)=>{
  const {data} = await axios.get(`/api/products?pageNum=${pageNum}`);

  return data;
}

const ProductListPage = () => {
  return <ProductListPageCom fetchProducts={fetchProducts} />
}

export default ProductListPage