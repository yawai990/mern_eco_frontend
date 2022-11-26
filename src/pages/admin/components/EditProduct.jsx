import { useState, useEffect, useRef, Fragment } from 'react';
import { Container,Row,Col,Form,Button,CloseButton,Table,Alert, FormGroup,Image } from "react-bootstrap"
import {Link, useParams, useNavigate } from 'react-router-dom';
import { changeCategory,setValueFromAttrForm, setAttributeWrapper } from './utils/utils';

const onHover={
  cursor:'pointer',
  position:'absolute',
  left:'5px',
  top:'-10px', 
  transform:'scale(2)'
};

const AdminEditProductCom = ({ categories , fetchProduct, updateProductApi, reduxDispatch, saveAttributetoCatDoc, imageDeleteHanlder, uploadHandler, uploadImageCloudinary }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated,setValidated] = useState(false);
  const [ productData, setProductData ] = useState({});
  const [ errMessage, setErrMessage ] = useState('');
  const [ attributesFromDB, setAttributesFromDB ] = useState([]); // for select 
  const [ attributeTable, setAttributeTable ] = useState([]); //for showing the data
  const [ categoryChoosen, setCategoryChoosen ] = useState('Choose Category');
  const [ newAttrKey, setNewAttrKey ] = useState(false);
  const [ newAttrValue, setNewAttrValue ] = useState(false);
  const [ imageRemoved, setImageRemoved ] = useState(false);
  const [ isUploading, setIsUploading ] = useState('');
  const [ imageUploaded, setImageUploaded ] = useState(false);

  const valueRef= useRef(null);
  const keyRef= useRef(null);
  const newAttr_key = useRef(null);
  const newAttr_value = useRef(null);

  useEffect(()=>{
    fetchProduct(id)
    .then(resp => setProductData(resp))
    .catch(err => setErrMessage(err.message))
  }, [ id, imageRemoved, imageUploaded ]);


  useEffect(()=>{
    const categoryOfEditProduct = categories.find(item => item.name === productData.category);

    if(categoryOfEditProduct){
        const mainCateogryEditProduct = categoryOfEditProduct.name.split('/')[0];
        // wanna get the name and category names are the same 
          const mainCategoryofEditedProductAllData = categories.find(categoryOfEditProduct => categoryOfEditProduct.name === mainCateogryEditProduct)

        if(mainCategoryofEditedProductAllData && mainCategoryofEditedProductAllData.attrs.length > 0) {
           setAttributesFromDB(mainCategoryofEditedProductAllData.attrs)
        }
    };
    setCategoryChoosen(productData.category)
    setAttributeTable(productData.attrs)
  }, [productData]);



    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
      const form=e.currentTarget.elements;

      const formInputs ={
        name : form.name.value,
        description : form.description.value,
        count : form.stock.value,
        price : form.price.value,
        category : form.category.value,
        attributeTable
      }


      if(e.currentTarget.checkValidity() === true){
        updateProductApi( id, formInputs) // this return promises
        .then(resp => {
            if(resp.message === 'Product updated') navigate('/admin/products')
        })
        
      }

      setValidated(true)
    };


    const attributeValueSelected = e =>{
      if(e.target.value !== 'Choose Attribute Value'){
        setAttributeWrapper(keyRef.current.value, e.target.value, setAttributeTable)
      }
    };

    const deleteAttribute = (key) =>{
      setAttributeTable(table => table.filter(item => item.key !== key))
    };

   const keyDownHandler = e =>{
    if(e.code === 'Enter') {
      e.preventDefault()
    }
   };

   const newAttributeKeyHandler =(e)=>{
    e.preventDefault();
    setNewAttrKey(e.target.value)
    addNewAttributeManually(e)
   };

   const newAttributeValueHandler =(e)=>{
    e.preventDefault();
    setNewAttrValue(e.target.value)
    addNewAttributeManually(e)
   };

   const addNewAttributeManually = e=> {
    if(e.keyCode && e.keyCode === 13){
      if( newAttrKey && newAttrValue){
        reduxDispatch(saveAttributetoCatDoc(newAttrKey, newAttrValue, categoryChoosen))
        setAttributeWrapper(newAttrKey, newAttrValue, setAttributeTable);
        e.target.value = '';
        newAttr_key.current.value = '';
        newAttr_value.current.value = '';
        setNewAttrKey(false);
        setNewAttrValue(false)
      }
    }
   }

      return (
    <Container>

      <Row className='justify-content-md-center mt-4'>

              <Col md={1}>
                <Link to="/admin/products" className='btn btn-info my-3'>Go Back</Link>
              </Col>
              <Col md={6}>
                <h3 className="fw-bold">Edit Product</h3>

                <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={keyDownHandler}>

                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name'  required type='text' defaultValue={productData.name} />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicTextarea">
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{resize:'none'}} name='description' as="textarea" required type='text' defaultValue={productData.description} />
                  </Form.Group>

                  
                  <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control name='stock' required type='number' min={0} defaultValue={productData.count} />
                  </Form.Group>
     
                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name='price' required type='text' defaultValue={productData.price} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>
                      Category
                    </Form.Label>

                    <Form.Select required name='category' 
                    onChange={e => changeCategory(e,categories, setAttributesFromDB, setCategoryChoosen)}
                    > 
                      <option value='Choose Category'>Choose Category</option>
                      {
                        categories?.map(category =>{
                            return category.name === productData.category ? 
                            <option key={category._id} value={category.name} selected>{category.name}</option>:
                            <option key={category._id} value={category.name}>{category.name}</option>
                        })
                      }

                    </Form.Select>
                  </Form.Group>

                    {
                      attributesFromDB.length > 0 && 
                  <Row className="mb-3">

                    <Col md={6}>
                      <FormGroup className="mb-3" controlId="formBasicAttributes">
                        <Form.Label>Choose attribute and set value</Form.Label>
                        <Form.Select name='attrkey' ref={keyRef} 
                        onChange={e => setValueFromAttrForm(e, valueRef, attributesFromDB)}
                        >
                          <option>Choose attribute</option>
                          {
                            attributesFromDB?.map((attr,ind) =>(
                              <Fragment key={`${attr.key} ${ind}`}>
                              <option value={attr.key}>{attr.key}</option>
                              </Fragment>
                            ))
                          }
                        </Form.Select>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                    <FormGroup className="mb-3" controlId="formBasicAttributesvalue">
                        <Form.Label>Attribute Value</Form.Label>
                        <Form.Select name='attrvalue' ref={valueRef} onChange={attributeValueSelected}>
                          <option>Choose attribute value</option> 
                        </Form.Select>
                      </FormGroup>
                    </Col>
                  </Row>
                    }

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
                        {
                          attributeTable?.map((attr, ind) => (
                                  <tr key={ind}>
                                    <td>{attr.key}</td>
                                    <td>{attr.value}</td>
                                    <td>
                                      <CloseButton onClick={()=>deleteAttribute(attr.key)} />
                                    </td>
                                  </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup className='mb-3' controlId="formBasicNewAttribute">
                        <Form.Label>Create new attributes</Form.Label>

                        <Form.Control 
                        ref={newAttr_key}
                        disabled={ categoryChoosen === 'Choose Category'} 
                        placeholder="first choose or create new category"
                        name='newAttriKey' type="text" 
                        onKeyUp={newAttributeKeyHandler}
                        required={newAttrValue}
                        />
                      </FormGroup>
                    </Col> 

                    <Col md={6}>
                      <FormGroup  className='mb-3' controlId="formBasicNewAttributeValue">
                      <Form.Label>Attribute Value</Form.Label>

                      <Form.Control 
                      ref={newAttr_value}
                      disabled={ categoryChoosen === 'Choose Category'} 
                      placeholder="first choose or create new category" 
                      name='newAttriValue' type="text"
                      onKeyUp={newAttributeValueHandler}
                      required={newAttrKey}
                      />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Alert show={ newAttrKey && newAttrValue ? true:false } variant="primary">After typing attribute key and value press enter  on one of the field</Alert>

                  <Form.Group className="mb-3" controlId="formBasicMultiple">
                    <Form.Label>Images</Form.Label>

                    <Row className='mb-3'>

                      {
                      productData.images && productData.images.map((image,ind)=>(
                      <Col xs={3} style={{position:'relative'}} key={ind}>
                        <Image 
                        src={image.path ?? null}
                        fluid />

                        {/* image removed button  */}
                        <i style={onHover} className="bi bi-x-lg"
                        onClick={()=>imageDeleteHanlder(image.path, id ).then(resp => setImageRemoved(!imageRemoved))}
                        ></i>
                      </Col>
                        ))
                      }
                    </Row>
                    <Form.Control name='product_image' type='file' multiple onChange={e => {
                      setIsUploading('upload files in progress....')
                      if(process.env.NODE_ENV === 'production'){

                        uploadHandler(e.target.files, id)
                        .then(data =>{
                          setIsUploading('upload files completed')
                          setImageUploaded(!imageUploaded)
                        })
                        .catch(err => setIsUploading(err.response.data.message ? err.response.data.message : err.response.data))
                      }else{
                        uploadImageCloudinary(e.target.files, id)
                        setIsUploading('upload file completed. wati for the result take effect, refresh the page if necessary')
                        setTimeout(()=>{
                          setImageUploaded(!imageUploaded)
                        },5000)
                      }
                      }} />
                      {isUploading}
                  </Form.Group>

                  <Button variant='primary' type="submitx">Update</Button>
                </Form>

                {
                    errMessage && <Alert variant='danger' className='mt-3'>{errMessage}</Alert>
                }
   

              </Col>
      </Row>

    </Container>
  )
}

export default AdminEditProductCom;