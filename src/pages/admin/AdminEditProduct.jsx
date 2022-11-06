import {useState} from 'react';
import { Container,Row,Col,Form,Button,CloseButton,Table,Alert, FormGroup,Image } from "react-bootstrap"
import {Link} from 'react-router-dom';

const onHover={
  cursor:'pointer',
  position:'absolute',
  left:'5px',
  top:'-10px',
  transform:'scale(2)'
}

const AdminEditProduct = () => {
  const [validated,setValidated] = useState(false);

    const handleSubmit = (e)=>{
      const form=e.currentTarget;

      if(form.checkValidity() === false){
        e.preventDefault();
        e.stopPropagation();
      }

      setValidated(true)
    }

  return (
    <Container>

      <Row className='justify-content-md-center mt-4'>

              <Col md={1}>
                <Link to="/admin/products" className='btn btn-info my-3'>Go Back</Link>
              </Col>
              <Col md={6}>
                <h3 className="fw-bold">Edit Product</h3>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name'  required type='text' defaultValue='Panasonic' />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicTextarea">
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{resize:'none'}} name='description' as="textarea" required type='text' defaultValue="Product Description" />
                  </Form.Group>

                  
                  <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control name='stock' required type='number' min={0} defaultValue={4} />
                  </Form.Group>
     
                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name='price' required type='text' defaultValue='$200' />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>
                      Category
                    </Form.Label>

                    <Form.Select required name='category'> 
                      <option>Choose Category</option>
                      <option value='1'>Laptops</option>
                      <option value='2'>TV</option>
                      <option value='3'>Game</option>

                    </Form.Select>
                  </Form.Group>


                  <Row className="mb-3">

                    <Col md={6}>
                      <FormGroup className="mb-3" controlId="formBasicAttributes">
                        <Form.Label>Choose attribute and set value</Form.Label>
                        <Form.Select name='attrkey'>
                          <option>Choose attribute</option>
                          <option>red</option>
                        </Form.Select>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                    <FormGroup className="mb-3" controlId="formBasicAttributesvalue">
                        <Form.Label>Attribute Value</Form.Label>
                        <Form.Select name='attrvalue'>
                          <option>Choose attribute value</option>
                          <option>red</option>
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
                        <Form.Control disabled={false} placeholder="first choose or create new category" name='newAttriValue' type="text" />
                      </FormGroup>
                    </Col> 

                    <Col md={6}>
                      <FormGroup  className='mb-3' controlId="formBasicNewAttributeValue">
                      <Form.Label>Attribute Value</Form.Label>
                      <Form.Control disabled={false} placeholder="first choose or create new category" name='newAttriValue' type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Alert variant="primary">After typing attribute key and value press enter  on one of the field</Alert>

                  <Form.Group className="mb-3" controlId="formBasicMultiple">
                    <Form.Label>Images</Form.Label>

                    <Row className='mb-3'>

                      {
                        [1,2].map(ind=>(
                      <Col xs={3} style={{position:'relative'}} key={ind}>
                        <Image src='/images/laptop.jpg' fluid />
                        <i style={onHover} className="bi bi-x-lg"></i>
                      </Col>
                        ))
                      }
                    </Row>
                    <Form.Control name='product_image' required type='file' multiple />
                  </Form.Group>

                  <Button variant='primary' type="submitx">Update</Button>
                </Form>

              </Col>
      </Row>

    </Container>
  )
}

export default AdminEditProduct