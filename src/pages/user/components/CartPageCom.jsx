import React from 'react';
import { Container,Row,Col, Alert, ListGroup,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {CartItem} from '../../../components';

const CartPageCom = ( { cartItems, cartSubtotal, reduxDispatch, addToCart, removeFromCart }) => {

    const changeCount = (productID, quan ) =>{
        reduxDispatch(addToCart(productID,quan))
    };

    const removeFromCartHandler = (id, price, quan)=>{
        reduxDispatch(removeFromCart(id, price, quan))
    }
  
  return (
    <Container className='mt-4'>
      <Row variant='flush'>

          <Col md={8}>
            <h2 className="fw-bold">Shopping Cart</h2>

            {
                cartItems.length > 0 ? 
                <CartItem 
                cartItems={cartItems} 
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
                 /> : <Alert variant='info'>Your Cart is Empty</Alert>    

            }

          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>SubTotal ( {cartItems.length} {cartItems.length === 1 ? "Product":"Products"})</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                Price : <span className="fw-bold">${cartSubtotal} </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <LinkContainer to='/user/cart-details'>
                <Button variant='primary' type='button' disabled={ cartItems.length === 0 } >Proceed To checkout</Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
      </Row>   
    </Container>
  )
}

export default CartPageCom;