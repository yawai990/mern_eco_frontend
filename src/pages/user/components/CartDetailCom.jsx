import {Container,Row,Col,Form, Alert, ListGroup, Button} from 'react-bootstrap';
import { CartItem } from '../../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDetailCom = ({ cartItems,quantity,cartSubtotal,addToCart, removeFromCart, reduxDispatch,getUser, userInfo, createOrder }) => {

  const [ buttonDisabled, setButtonDisabled ] = useState(false);
  const [ userAddress ,setUserAddress ] = useState({});
  const [ missingMessage , setMissingMessage ] = useState();
  const [ paymentMethod, setPaymentMethod ] = useState('pp');

  const navigate = useNavigate();

    const changeCount = (productID, quan ) =>{
        reduxDispatch(addToCart(productID,quan))
    };

    const removeFromCartHandler = (id, price, quan)=>{
        reduxDispatch(removeFromCart(id, price, quan))
    }

    useEffect(()=>{

        getUser(userInfo._id)
        .then(resp =>{
         if( !resp.address || !resp.city || !resp.country || !resp.phoneNumber || !resp.state || !resp.zipCode ) {
          setButtonDisabled(true)
          setMissingMessage('In order to make order.  fill out your profile with correct address etc....')
         }else{
         setUserAddress({
          address : resp.address ,
          state : resp.state,
          city : resp.city,
          country : resp.country,
          zipCode : resp.zipCode,
          phoneNumber : resp.phoneNumber
        })
        setMissingMessage(false)
      }
        })
        .catch(err => console.log(err))
    },[userInfo._id]);

    const orderHandler = () =>{
      const orderData = {
        orderTotal : {
          itemCounts : quantity,
          cartSubTotal:cartSubtotal
        },
        cartItems : cartItems.map(item => (
           { 
            productID : item.productID,
            name : item.name,
            price : item.price,
            image : {
             path : item.image ? item.image.path ?? null : null,
            },
            quantity: item.quantity,
            count : item.count,
           }
        )), 
        paymentMethod
      };

      createOrder(orderData)
      .then(resp =>{
        if(resp) navigate(`/user/order-details/${resp._id }`)
      })
      .catch(err => console.log(err))
    };
    
    const choosePayment = e=> setPaymentMethod(e.target.value)
    
  return (
    <Container>
            <Row className='mt-4'>
              <h4 className="fw-bold">Cart Details</h4>

              <Col md={8}>

                <Row>
                  <Col md={6}>
                  <h2>Shipping</h2>

                  <div>
                    <p><b>Name : </b>{`${userInfo.name} ${userInfo.lastName}`}</p>
                    <p><b>Address : </b>
                     {`${userAddress.address} ${userAddress.city} ${userAddress.state} ${userAddress.country}, ${userAddress.zipCode}`}
                    </p>
                    <p><b>Phone : </b> {userAddress.phoneNumber}</p>
                  </div>
                  </Col>

                  <Col md={6}>
                  <h2>Payment Method</h2>

                  <Form.Select disabled={false} onChange = {choosePayment}>
                    <option value='pp'>Paypal</option>
                    <option value='cod'>Cash On Delivery (delivery may be delayed)</option>
                  </Form.Select>
                  </Col>

                  <Row>
                    <Col>
                    <Alert className='mt-3' variant='danger'>No Delivered</Alert>
                    </Col>
                    <Col>
                    <Alert className='mt-3' variant='success'>Paid On 2022-10-20</Alert>
                    </Col>
                  </Row>

                {
                  missingMessage !== false &&
                <Row>
                      <Col>
                      <Alert variant='danger'>{missingMessage}</Alert>
                      </Col>
                    </Row>
                }
  

                </Row>

                    <h3>Order items</h3>

                    <ListGroup variant='flush'>
                     { 
                     cartItems.length > 0 ?
                     <CartItem cartItems={cartItems} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler} />:
                     <Alert variant='danger'>You do have any orders</Alert>
                     }
                    </ListGroup>

              </Col>

              <Col md={4}>
                <h3>Order Summary</h3>

                <ListGroup>
                  <ListGroup.Item>
                          <p>Items price(tax included) : <b>$ {cartSubtotal}</b></p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                          <p>Shipping : <b>included</b></p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                          <p>Tax : <b>included</b></p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                          <p className='text-danger'>Total Price : <b>$ {cartSubtotal}</b></p>
                  </ListGroup.Item>

                  <ListGroup.Item>

                    <div className="d-grid gap-2">
                          <Button variant='danger' 
                          size='md' type="button" 
                          disabled={buttonDisabled}
                          onClick ={orderHandler}
                          >Place Order</Button>
                    </div>
                  </ListGroup.Item>

                </ListGroup>
              </Col>

            </Row>
    </Container>
  )
}

export default CartDetailCom;