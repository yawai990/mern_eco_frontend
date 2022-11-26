import ProductsPage from './components/ProductsPage';
import axios from 'axios';

const fetchProducts = async (  abctl ) =>{
    const { data } = await axios.get('/api/products/admin', { 
      signal: abctl.signal
    });

    return data;
};

const deleteProduct = async (id) =>{

  const { data } = await axios.delete(`/api/products/admin/${id}`);

  return data;
}

const AdminProducts = () => {
          return <ProductsPage fetchProducts={fetchProducts} deleteProduct={deleteProduct} />
}
export default AdminProducts