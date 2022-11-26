import {Container,Row,Col,Image, Alert, ListGroup,Form,Button} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import {AddtoCartMessage} from '../../../components';
import ImageZoom from 'js-image-zoom';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailsPageCom = ({ getProduct, reduxDispatch, addToCart}) => {
    const {id} = useParams();
    const [ showCartMessage, setShowCartMessage ] = useState(false);

     const [ productDetails, setProductDetails ] = useState({});
     const [quantity, setQuantity ]  = useState(1);

     const addToCartHandler = () => {
      reduxDispatch(addToCart( id , quantity ));
      setShowCartMessage(true)
     }

    const options = {
        width:320,
        zoomWidth: 250,
        scale:2,
        offset: {vertical: 0, horizontal: 0}
    };

    useEffect(()=>{
        getProduct(id)
        .then(resp => setProductDetails(resp))
        .catch(err => console.log(err))
    },[id])

  useEffect(()=>{
      new ImageZoom(document.getElementById('first'),options);
      new ImageZoom(document.getElementById('second'),options);
      new ImageZoom(document.getElementById('third'),options);
  },[])

  return (
    <Container>

       <AddtoCartMessage showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage} />

      <Row className='mt-4'>
        <Col style={{zIndex:1}} md={4}>
            {
               (productDetails.images !== undefined &&  productDetails.images.length) > 0 && <>
                   <div id="first">
          <Image fluid src={productDetails?.images[0].path} />
          </div>
          <div id="second">
          <Image fluid src={productDetails?.images[1].path} />
          </div>
          <div id="third">
          <Image fluid src={productDetails?.images[2].path} />
          </div>
                </>
            }

        </Col>

        <Col md={8}>
              <Row>
              <Col md={8}>
                <ListGroup variant='flush'>

                  <ListGroup.Item>
                  <h1>{productDetails?.name}</h1>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating initialValue={productDetails?.rating} readonly size={20} /> ({productDetails.reviewsNumber})
                    </ListGroup.Item>

                    <ListGroup.Item>
                    Price <span className="fw-bold">${productDetails?.price}</span>
                    </ListGroup.Item>

                      <ListGroup.Item>
                     {productDetails?.description}
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
                    <Form.Select value={quantity} onChange={ e => setQuantity(e.target.value)} >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Form.Select>
                  </ListGroup.Item>

                  <ListGroup.Item>
                   <Button variant='danger' onClick={addToCartHandler}>Add to Cart</Button>
                  </ListGroup.Item>

                </ListGroup>
              </Col>
              </Row>
              
              <Row>

                  <Col className='mt-5'>
                    <h5>Reviews</h5>

                    <ListGroup variant='flush'>
                   { 

                    (productDetails.reviews !== undefined &&  
                    productDetails.reviews.length) > 0 &&   
                     productDetails.reviews.map(proDetail=>(

                        <ListGroup.Item key={proDetail._id}>
                          <h6>{proDetail.user.name}</h6>

                          <Rating initialValue={proDetail.rating} size={20} readonly />

                          <p>{proDetail.createdAt.substring(0,10)}</p>

                          <p>{proDetail.comment}</p>
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

export default ProductDetailsPageCom;