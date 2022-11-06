import {Container,Row,Col,Image, Alert, ListGroup,Form,Button} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import {AddtoCartMessage} from '../components';
import ImageZoom from 'js-image-zoom';
import {useEffect} from 'react';

const ProductDetailsPage = () => {
  const options = {
    width:320,
    zoomWidth: 250,
    scale:2,
    offset: {vertical: 0, horizontal: 0}
};

  useEffect(()=>{
      new ImageZoom(document.getElementById('first'),options);
      new ImageZoom(document.getElementById('second'),options);
      new ImageZoom(document.getElementById('third'),options);
      new ImageZoom(document.getElementById('fourth'),options);
  },[])

  return (
    <Container>
      <AddtoCartMessage />
      <Row className='mt-4'>
        <Col style={{zIndex:1}} md={4}>
          <div id="first">
          <Image fluid src='/images/canoncamera.jpg' />
          </div>
          <div id="second">
          <Image fluid src='/images/watches02.jpg' />
          </div>
          <div id="third">
          <Image fluid src='/images/canoncamera.jpg' />
          </div>
          <div id="fourth">
          <Image fluid src='/images/watches02.jpg' />
          </div>
        </Col>

        <Col md={8}>
              <Row>
              <Col md={8}>
                <ListGroup variant='flush'>

                  <ListGroup.Item>
                  <h1>Product Name</h1>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating initialValue={4} readonly size={20} /> (1)
                    </ListGroup.Item>

                    <ListGroup.Item>
                    Price <span className="fw-bod">$345</span>
                    </ListGroup.Item>

                      <ListGroup.Item>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, earum. Hic quidem sint placeat ipsa! Perspiciatis nobis ullam molestias qui.
                      </ListGroup.Item>

                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item>
                    Status : In Stock
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price : <span className='fw-bold'>$345</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Quantity :
                    <Form.Select>
                      <option>1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                    </Form.Select>
                  </ListGroup.Item>

                  <ListGroup.Item>
                   <Button variant='danger'>Add to Cart</Button>
                  </ListGroup.Item>

                </ListGroup>
              </Col>
              </Row>
              
              <Row>

                  <Col className='mt-5'>
                    <h5>Reviews</h5>

                    <ListGroup variant='flush'>
                   { 
                   [1,2,3,4].map(ind=>(

                        <ListGroup.Item key={ind}>
                          <h6>Jhon Smith</h6>

                          <Rating initialValue={ind > 3 ? 4:5} size={20} readonly />

                          <p>2022-11-03</p>

                          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas expedita doloribus voluptates vero illo.</p>
                        </ListGroup.Item>
                   ))
                  }
                  </ListGroup>

                    <Alert variant='danger'>Login first to write a review</Alert>

                  </Col>
              </Row>

            <hr />

            <Form>

            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold'>Write Review</Form.Label>
              <Form.Control style={{resize:'none'}} as='textarea' rows={4} placeholder='name@example.com' />
            </Form.Group>

          <Form.Select className='mb-3'>
            
            <option>Your Rating</option>
            <option value='5'>5 (very good)</option>
            <option value='4'>4 (good)</option>
            <option value='3'>3 (average)</option>
            <option value='2'>2 (bad)</option>
            <option value='1'>1 (awful)</option>
          </Form.Select>

          <Button variant='primary'>Submit</Button>

          </Form>

        </Col>

      </Row>
    </Container>
  )
}

export default ProductDetailsPage