import { Container,Alert,Form,Row,Col,ListGroup,Button } from "react-bootstrap";
import { CartItem } from "../../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';

const OrderDetail = ({ fetchSpecificOrder, markAsDelivered }) => {
    const { id } = useParams();
    const [ userInfo, setUserInfo ] = useState({});
    const dispatch  = useDispatch();
    
  const [ paymentMethod, setPaymentMethod ] = useState('');
  const [ isPaid, setIsPaid ] = useState(false);
  const [ isDelivered, setIsDelivered ] = useState(false);
  const [ cartSubTotal, setCartSubTotal ] = useState(0);
  const  [ buttonDisabled, setButtonDisabled ] = useState(false);
  const  [ orderButtonMessage, setorderButtonMessage ] = useState('Mark as Delivered');
  const [ cartItems, setCartItems ] = useState([]);

    useEffect(()=>{

        fetchSpecificOrder(id)
        .then(resp => {
            setUserInfo(resp.user)
            setPaymentMethod(resp.paymentMethod)
            resp.ispaid ? setIsPaid(resp.paidAt) : setIsPaid(false);
            resp.isDelivered ? setIsDelivered(resp.deliveredAt) : setIsDelivered(false);
            setCartSubTotal(resp.orderTotal.cartSubTotal);

            if(resp.isDelivered) {
                setorderButtonMessage('Order is finished')
                setButtonDisabled(true)
            };
            setCartItems(resp.cartItems)
        })
        .catch(err => dispatch(logout()));
    },[ isDelivered, id ]);


    return (
        <Container>
        <Row className='mt-4'>
          <h4 className="fw-bold">Order Details</h4>
      
          <Col md={8}>
      
            <Row>
              <Col md={6}>
              <h2>Shipping</h2>
      
              <div>
                <p className="m-0 p-0"><b>Name : </b> {`${userInfo.name} ${userInfo.lastName}`}</p>
                <p className="m-0 p-0"><b>Address : </b> {`${userInfo.address} ${userInfo.city} ${userInfo.zipCode}`}</p>
                <p className="m-0 p-0"><b>Phone : </b> {userInfo.phoneNumber}</p>
              </div>
              </Col>
      
              <Col md={6}>
              <h2>Payment Method</h2>
      
              <Form.Select disabled={true   } value={paymentMethod}>
                <option value='pp'>Paypal</option>
                <option value='cod'>Cash On Delivery (delivery may be delayed)</option>
              </Form.Select>
              </Col>
      
              <Row>
                <Col>
                <Alert className='mt-3' variant={isDelivered ? 'success':'danger'}>
                    { 
                    isDelivered ? <>Delivered At {isDelivered}</>:<>Not Delivered</>
                    }
                </Alert>
                </Col>
                <Col>
                <Alert className='mt-3' variant={isPaid ? 'success':'danger'}>
                    {
                        isPaid ? <>Paid At {isPaid}</>:
                        <>Not Paid yet</>
                    }
                </Alert>
                </Col>
              </Row>
      
            </Row>
      
                <h3>Order items</h3>
      
                <ListGroup variant='flush'>
                  <CartItem cartItems={cartItems} />
                </ListGroup>
      
          </Col>
      
          <Col md={4}>
            <h3>Order Summary</h3>
      
            <ListGroup>
              <ListGroup.Item>
                      <p>Items price(tax included) : <b>$ {cartSubTotal}</b></p>
              </ListGroup.Item>
      
              <ListGroup.Item>
                      <p>Shipping : <b>included</b></p>
              </ListGroup.Item>
      
              <ListGroup.Item>
                      <p>Tax : <b>included</b></p>
              </ListGroup.Item>
      
              <ListGroup.Item>
                      <p className='text-danger'>Total Price : <b>$ {cartSubTotal}</b></p>
              </ListGroup.Item>
      
              <ListGroup.Item>
      
                <div className="d-grid gap-2">
                      <Button 
                      variant='danger' disabled={buttonDisabled} 
                      size='md' type="button"
                      onClick={() =>
                         markAsDelivered(id)
                         .then(resp =>{
                            if(resp){
                                setIsDelivered(true)
                            }
                         })
                        .catch(err => console.log(err))
                    }
                      >
                        {orderButtonMessage}
                      </Button>
                </div>
              </ListGroup.Item>
      
            </ListGroup>
          </Col>
      
        </Row>
      </Container>
      )
}

export default OrderDetail