import React from 'react';
import { Image, ListGroup,Row,Col,Form, Button } from 'react-bootstrap';

const cartitems=[
    {id:1,name:'Product1 Lenovo',image:'/images/laptop.jpg'},
    {id:2,name:'Product2 Tablet',image:'/images/tablet.jpg'}
]

const CartItem = () => {
  return (
   <ListGroup>
    {
        cartitems.map((item,ind)=>(
            <ListGroup.Item key={ind}>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin='anonymous' src={item.image} fluid />
                    </Col>
                    <Col md={2}>
                        <span className='fw-bold'>{item.name}</span>
                    </Col>
                    <Col md={2}> md={3}
                        <b>$89</b>
                    </Col>
                    <Col md={3}>
                    <Form.Select>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </Form.Select>
                        </Col>

                    <Col md={3}>
                        <Button type='button' variant='secondary' onClick={()=>window.confirm('Are u sure?')}>
                        <i className="bi bi-trash-fill"></i>
                        </Button>
                    </Col>

                </Row>
            </ListGroup.Item>
        ))
    }
   </ListGroup>
  )
}

export default CartItem