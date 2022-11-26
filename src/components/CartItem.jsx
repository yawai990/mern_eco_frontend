import React from 'react';
import { Image, ListGroup,Row,Col,Form, Button } from 'react-bootstrap';

const CartItem = ({ cartItems, orderCreated = false, changeCount, removeFromCartHandler = false }) => {

    const removeHandler = (id, price, quan) =>{
            if(window.confirm('Are u sure? ')){
                removeFromCartHandler(id,price,quan)
            }else{
                return null;
            }
    }

  return (
   <ListGroup>
    {
        cartItems?.map((item,ind)=>(
            <ListGroup.Item key={item.productID || item._id}>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin='anonymous'
                         src={item.image ? item.image.path ?? null : null } 
                         fluid />
                    </Col>
                    <Col md={2}>
                        <span className='fw-bold'>{item.name}</span>
                    </Col>
                    <Col md={2}>
                        <b>${item.price}</b>
                    </Col>
                    <Col md={3}>
                    <Form.Select disabled={orderCreated} value={item.quantity} onChange={e=>changeCount(item.productID,e.target.value)}>
                        {
                            [...Array(item.count).keys()].map((x,ind) => (

                                <option value={x + 1 } key={ind}> {x + 1} </option>
                            ))
                        }

                    </Form.Select>
                        </Col>

                    <Col md={3}>
                        <Button type='button' variant='secondary' 
                        onClick={()=>removeHandler(item.productID, item.price, item.quantity)}
                        >
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