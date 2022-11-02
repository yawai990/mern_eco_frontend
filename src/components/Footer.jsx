import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
        <Container fluid>
          <Row>
            <Col className='bg-dark text-light text-center py-3'>Copyright &copy; Best Online Shop</Col>
          </Row>
        </Container>
        </footer>
  )
}

export default Footer