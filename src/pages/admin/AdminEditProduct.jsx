import AdminEditProductCom from './components/EditProduct';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveAttributetoCatDoc } from '../../redux/actions/category';
import { uploadImage, uploadImageCloudinary } from './utils/util';

const fetchProduct = async ( productID) => {
  const {data} = await axios.get(`/api/products/get-one/${productID}`);

  return data;
};

const updateProductApi = async (productId, formInputs )=>{

  const { data } = await axios.put(`/api/products/admin/${productId}`, formInputs);

  return data;
};

  const imageDeleteHanlder = async (imagePath, productId ) => {
    const encoded = encodeURIComponent(imagePath);  

    if(process.env.NODE_ENV === 'production') {

          await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
            }
            else{
          await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`);
            }
  };

 const AdminEditProduct = () => {
  const categories = useSelector(state => state.getCategories.categories);
  const reduxDispatch = useDispatch();

  return <AdminEditProductCom 
  categories={categories} fetchProduct={fetchProduct}
  updateProductApi={updateProductApi} 
   reduxDispatch={reduxDispatch} saveAttributetoCatDoc={saveAttributetoCatDoc}
   imageDeleteHanlder={imageDeleteHanlder} uploadHandler={uploadImage}
   uploadImageCloudinary={uploadImageCloudinary}
   />
}

export default AdminEditProduct