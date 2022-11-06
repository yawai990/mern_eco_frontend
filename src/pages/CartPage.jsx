import React from 'react';
import { Container,Row,Col, Alert, ListGroup,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {CartItem} from '../components';

const CartPage = () => {
  return (
    <Container className='mt-4'>
      <Row variant='flush'>

          <Col md={8}>
            <h2 className="fw-bold">Shopping Cart</h2>

                  <CartItem />

            <Alert variant='info'>Your Cart is Empty</Alert>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>SubTotal ( 2 Items)</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                Price : <span className="fw-bold">$450</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <LinkContainer to='/user/cart-details'>
                <Button variant='primary' type='button'>Proceed To checkout</Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
      </Row>   
    </Container>
  )
}

export default CartPage