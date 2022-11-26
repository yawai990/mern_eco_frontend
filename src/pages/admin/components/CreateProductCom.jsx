import { useState, useRef } from "react";
import { Container,Row,Col,Form,Button,CloseButton,Table,Alert, FormGroup } from "react-bootstrap"
import {Link, useNavigate} from 'react-router-dom';
import { changeCategory,setValueFromAttrForm, setAttributeWrapper } from './utils/utils';

//need to add when admin added the new cateogry

const CreateProductCom = ({ createNewProduct, uploadImage, uploadImageCloudinary, categories, dispatch, newCategory, deleteCategory, saveAttributetoCatDoc }) => {
  
 const [validated,setValidated] = useState(false);
 const [ attributeTable, setAttributeTable ] = useState([]);
 const [ images, setImages ] = useState(false);
 const [ isCreating, setIsCreating ] = useState('');
 const [ createProductResponseState, setCreateProductResponseState ] = useState({
    message:'', error : ''
 });
 const [ categoryChoosen, setCategoryChoosen ] = useState('Choose Category');

 const [ newAttrKey , setNewAttrKey ] = useState('');
 const [ newAttrValue , setNewAttrValue ] = useState('');

 const valueRef= useRef(null);
 const keyRef= useRef(null);
 const createNewAttrKey = useRef(null);
 const createNewAttrValue = useRef(null);

 const navigate = useNavigate();

 const uploadHandler = images =>{
  setImages(images)
};

const newCategoryHandler = e => {
   if(e.keyCode && e.keyCode === 13 && e.target.value ) {
    dispatch(newCategory(e.target.value));
    setTimeout(()=>{
      const element = document.getElementById('catVal');
      element.value = e.target.value;
      setCategoryChoosen(e.target.value)
      e.target.value = '';
    },300)
   }
};

const newAttrKeyHandler = e=>{
  console.log(e.target.value)
  e.preventDefault();
  setNewAttrKey(e.target.value)
  addAttributeManually(e)
}

const newAttrValueHandler = e=>{
  e.preventDefault();
  setNewAttrKey(e.target.value)
  addAttributeManually(e)
};

const addAttributeManually = e =>{
  if(e.keyCode && e.keyCode === 13){
    dispatch(saveAttributetoCatDoc(newAttrKey, newAttrValue, categoryChoosen ))
    setAttributeTable(newAttrKey, newAttrValue, categoryChoosen );
    e.target.value = '';
    createNewAttrKey.current = '';
    createNewAttrValue.current = '';
    setNewAttrKey(false)
    setNewAttrValue(false)
  }
};

 const handleSubmit = (e)=>{
    e.preventDefault();
    e.stopPropagation();

   const form=e.currentTarget;

   const formInputs = {
     name : form.name.value,
     description : form.description.value,
     category : form.category.value, 
     count : form.stock.value, 
     price : form.price.value, 
     attrsTable :attributeTable
   };
   if(e.currentTarget.checkValidity() === true){
    if(Number(images.length) > 3 ){
      console.log('run')
      setIsCreating('Too Many files')
      return 
    }

    createNewProduct(formInputs)
    .then(resp =>{
      if(images){
              if( process.env.NODE_ENV !== 'production'){
                uploadImage(images, resp.productId)
                .then( data =>console.log(data))
                .catch(err => setCreateProductResponseState({error : err.response.data.message ? err.response.data.message : err.response.data}))
              }else {
                uploadImageCloudinary(images, resp.productId)
              }
             }
             if( resp.message === 'Product created') navigate('/admin/products')
    })
    .catch(err =>  setCreateProductResponseState({error :err.response.data.message ? err.response.data.message : err.response.data}))
   }

   setValidated(true)
 };


  const deleteCategoryHandler = e =>{
  const element = document.getElementById('catVal');
  dispatch(deleteCategory(element.value));
  setCategoryChoosen('Choose Category')
 }

return (
 <Container>

   <Row className='justify-content-md-center mt-4'>

           <Col md={1}>
             <Link to="/admin/products" className='btn btn-info my-3'>Go Back</Link>
           </Col>
           <Col md={6}>
             <h3 className="fw-bold">Create New Product</h3>

             <Form noValidate validated={validated} onSubmit={handleSubmit}>

               <Form.Group className="mb-3" controlId="formBasicName">
                 <Form.Label>Name</Form.Label>
                 <Form.Control name='name' required type='text' />

               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicTextarea">
                 <Form.Label>Description</Form.Label>
                 <Form.Control name='description' as="textarea" required type='text' />
               </Form.Group>

               
               <Form.Group className="mb-3" controlId="formBasicStock">
                 <Form.Label>Count in Stock</Form.Label>
                 <Form.Control name='stock' required type='number' min={0} />
               </Form.Group>
               
               <Form.Group className="mb-3" controlId="formBasicPrice">
                 <Form.Label>Price</Form.Label>
                 <Form.Control name='price' required type='text' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicStock">
                 <Form.Label>
                   Category
                   <CloseButton onClick={deleteCategoryHandler} /> <small>(remove selected)</small> 
                 </Form.Label>

                 <Form.Select required name='category' id='catVal' 
                 onChange={e=>changeCategory( e, categories, setAttributeTable,setCategoryChoosen)}> 
                   <option value='Choose Category'>Choose Category</option>
                   {
                    categories?.map(category => (
                      <option value={category.name} key={category._id}>{category.name}</option>
                    ))
                   }
                   </Form.Select>
               </Form.Group>

               <FormGroup className='mb-3' controlId='formBasicNewCategory'>
                 <Form.Label>Or create a new category (e.g. Computers/ Laptops/Intel)  {" "}</Form.Label>
                 <Form.Control type="text" name="new_category" onKeyUp={newCategoryHandler} />
               </FormGroup>

               <Row className="mb-3">

                 <Col md={6}>
                   <FormGroup className="mb-3" controlId="formBasicAttributes">
                     <Form.Label>Choose attribute and set value</Form.Label>
                     <Form.Select name='attrkey' ref={keyRef}>
                       <option>Choose attribute</option>
                       {
                        attributeTable?.map((attrKey, ind) =>(
                          <option value={attrKey.key} key={ind}>{attrKey.key}</option>
                        ))
                       }
                     </Form.Select>
                   </FormGroup>
                 </Col>

                 <Col md={6}>
                 <FormGroup className="mb-3" controlId="formBasicAttributesvalue">
                     <Form.Label>Attribute Value</Form.Label>
                     <Form.Select name='attrvalue'>
                       <option>Choose attribute value</option>
                     </Form.Select>
                   </FormGroup>
                 </Col>
               </Row>

               <Row>
                 <Table responsive hover>
                   <thead>
                     <tr>
                       <th>Attribute</th>
                       <th>Value</th>
                       <th>Delete</th>
                     </tr>
                   </thead>

                   <tbody>
                     <tr>
                       <td>attr key</td>
                       <td>attr value</td>
                       <td>
                         <CloseButton />
                       </td>
                     </tr>
                   </tbody>
                 </Table>
               </Row>

               <Row>
                 <Col md={6}>
                   <FormGroup className='mb-3' controlId="formBasicNewAttribute">
                     <Form.Label>Create new attributes</Form.Label>
                     <Form.Control disabled={ categoryChoosen === 'Choose Category'} 
                     ref= {createNewAttrKey}
                     onKeyUp = { newAttrKeyHandler }
                     placeholder="first choose or create new category" name='newAttriValue' type="text" />
                   </FormGroup>
                 </Col> 

                 <Col md={6}>
                   <FormGroup  className='mb-3' controlId="formBasicNewAttributeValue">
                   <Form.Label>Attribute Value</Form.Label>
                   <Form.Control disabled= { categoryChoosen === 'Choose Category'} 
                   ref= { createNewAttrValue}
                   required = { newAttrKey}
                   onKeyUp = { newAttrValueHandler }
                   placeholder="first choose or create new category" name='newAttriValue' type="text" />
                   </FormGroup>
                 </Col>
               </Row>

               <Alert show={(newAttrKey && newAttrValue) ? true:false} variant="primary">After typing attribute key and value press enter  on one of the field</Alert>

               <Form.Group className="mb-3" controlId="formBasicMultiple">
                 <Form.Label>Images</Form.Label>

                 <Form.Control name='product_image' 
                 required type='file' multiple 
                 onChange={e=>uploadHandler(e.target.files)}
                  />
                  {isCreating ? isCreating:null}
               </Form.Group>

               <Button variant='primary' type="submitx">Create</Button>

                { createProductResponseState.error ?? ""}

             </Form>

           </Col>
   </Row>

 </Container>
)
}

export default CreateProductCom