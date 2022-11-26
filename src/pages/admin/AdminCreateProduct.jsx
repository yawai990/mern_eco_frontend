import CreateProductCom from './components/CreateProductCom';
import axios from 'axios';
import { uploadImage, uploadImageCloudinary } from './utils/util';
import { useDispatch, useSelector } from 'react-redux';
import { newCategory, deleteCategory, saveAttributetoCatDoc  } from '../../redux/actions/category';

const createNewProduct = async(newProductData)=>{
  const { data } =await axios.post(`/api/products/admin`, newProductData);

  return data;
};

const AdminCreateProduct = () => {

  const { categories } = useSelector(state => state.getCategories);
  const dispatch = useDispatch();

    return <CreateProductCom 
    createNewProduct={createNewProduct} uploadImage={uploadImage}
    uploadImageCloudinary={uploadImageCloudinary} dispatch={dispatch}
    newCategory={newCategory} categories={categories} deleteCategory={deleteCategory}
    saveAttributetoCatDoc={saveAttributetoCatDoc}
     />
}

export default AdminCreateProduct