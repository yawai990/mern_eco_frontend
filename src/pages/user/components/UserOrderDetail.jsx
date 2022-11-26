import {Container,Row,Col,Form,Button,ListGroup,Alert} from 'react-bootstrap';
import { CartItem } from '../../../components';
import { useParams } from 'react-router-dom';
import { useState , useEffect, useRef } from 'react';

const UserOrderDetailsCom = ({ userInfo, getUser, getOrder, loadScript, loadPaypalScript }) => {
  const {id} =  useParams();
  const [ userInfoData, setUserInfoData ] = useState({});
  const [ isPaid, setIsPaid ] = useState(false);
  const [ paymentMethod, setPaymentMethod ] = useState('');
  const [ orderButtonMessage, setOrderButtonMessage ] = useState('');
  const [ isDelivered, setIsDelivered ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartSubtotal, setCartSubtotal ] = useState(0);
  const [ buttonDisabled, setButtonDisabled ] = useState(false);

  const PaypalContainer = useRef();

  useEffect(()=>{
      getUser(userInfo._id)
      .then(resp => {
          setUserInfoData(resp)
      })
      .catch(err => console.log(err));
  },[userInfo._id]);

  useEffect(()=>{
    getOrder(id)
    .then(resp=>{
      setPaymentMethod(resp.paymentMethod)
      setIsDelivered(resp.isDelivered ? resp.deliveredAt: false)
      setIsPaid(resp.isPaid ? resp.paidAt:false)
      setCartSubtotal(resp.orderTotal.cartSubTotal);
      setCartItems(resp.cartItems)
      if(resp.isPaid){
        setOrderButtonMessage('Your Order is finished');
        setButtonDisabled(true)
      }else {
        if(resp.paymentMethod === 'pp'){
          setOrderButtonMessage('Pay for your order');
        }else  if(resp.paymentMethod === 'cod'){
          setButtonDisabled(true)
          setOrderButtonMessage('Wait for your order. You pay on delivery');
        }
      }
    })
    .catch(err =>console.log(err))
  },[]);

  const orderHandler = ()=>{
    setButtonDisabled(true)

    if(paymentMethod === 'pp'){
      setOrderButtonMessage('To pay for your order click one of the buttons below')
      if(!isPaid){
        loadPaypalScript( cartSubtotal, cartItems, id, updateStateAfterOrder)
        //load  paypal script & do actions
      }
    }else{
      setOrderButtonMessage('You order was placed. Thank You!')
    }
  };

  const updateStateAfterOrder = (paidAt) =>{
    setOrderButtonMessage('Thank you for your payment');
    setIsPaid(paidAt)
    setButtonDisabled(true);

    PaypalContainer.current.style = "dispaly : none";
  }

  return (
  <Container>
  <Row className='mt-4'>
    <h4 className="fw-bold">Order Details</h4>

    <Col md={8}>

      <Row>
        <Col md={6}>
        <h2>Shipping</h2>

        <div>
          <p><b>Name : </b> {`${userInfoData.name} ${userInfoData.lastName}`}</p>
          <p><b>Address : </b> {`${userInfoData.address} ${userInfoData.city}, ${userInfoData.state}, ${userInfoData.country}, ${userInfoData.zipCode}`}</p>
          <p><b>Phone : </b> {userInfoData.phoneNumber}</p>
        </div>
        </Col>

        <Col md={6}>
        <h2>Payment Method</h2>

        <Form.Select value={paymentMethod} disabled={true}>
          <option value='pp'>Paypal</option>
          <option value='cod'>Cash On Delivery (delivery may be delayed)</option>
        </Form.Select>
        </Col>

        <Row>
          <Col>
          <Alert className='mt-3' variant={isDelivered ? 'success':'danger'}>{isDelivered ? `Delivered at ${isDelivered}` : 'Not Delivered' }</Alert>
          </Col>
          <Col>
          <Alert className='mt-3' variant={isPaid ? "success":'danger'}>
            {
              isPaid ? `Paid at ${isPaid}` : 'Not paid yet'
            }
            </Alert>
          </Col>
        </Row>

      </Row>

          <h3>Order items</h3>

          <ListGroup variant='flush'>
            <CartItem cartItems={cartItems} orderCreated={true} />
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
                <Button variant='danger' size='md' 
                type="button" disabled={buttonDisabled}
                onClick={orderHandler}
                >
                  {orderButtonMessage}
                  </Button>
          </div>

          <div style={{ position:'relative', zIndex:1}}>
            <div ref={PaypalContainer} id='paypal-container-element'></div>
          </div>

        </ListGroup.Item>

      </ListGroup>
    </Col>

  </Row>
</Container>
)
}

export default UserOrderDetailsCom;