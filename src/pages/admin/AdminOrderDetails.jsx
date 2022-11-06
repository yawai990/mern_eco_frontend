import { Container,Alert,Form,Row,Col,ListGroup,Button } from "react-bootstrap";
import { CartItem } from "../../components";

const AdminOrderDetails = () => {
  return (
    <Container>
    <Row className='mt-4'>
      <h4 className="fw-bold">Order Details</h4>
  
      <Col md={8}>
  
        <Row>
          <Col md={6}>
          <h2>Shipping</h2>
  
          <div>
            <p className="m-0 p-0"><b>Name : </b> Jhon Doe</p>
            <p className="m-0 p-0"><b>Address : </b> No(123),Mya Street,Yangos</p>
            <p className="m-0 p-0"><b>Phone : </b> 09222333555</p>
            <p className="m-0 p-0"><b>Name:</b> Jhon Doe</p>
          </div>
          </Col>
  
          <Col md={6}>
          <h2>Payment Method</h2>
  
          <Form.Select>
            <option value='pp'>Paypal</option>
            <option value='cod'>Cash On Delivery (delivery may be delayed)</option>
          </Form.Select>
          </Col>
  
          <Row>
            <Col>
            <Alert className='mt-3' variant='success'>Delivered at 2022-10-25</Alert>
            </Col>
            <Col>
            <Alert className='mt-3' variant='success'>Paid On 2022-10-20</Alert>
            </Col>
          </Row>
  
        </Row>
  
            <h3>Order items</h3>
  
            <ListGroup variant='flush'>
              <CartItem />
            </ListGroup>
  
      </Col>
  
      <Col md={4}>
        <h3>Order Summary</h3>
  
        <ListGroup>
          <ListGroup.Item>
                  <p>Items price(tax included) : <b>$ 120</b></p>
          </ListGroup.Item>
  
          <ListGroup.Item>
                  <p>Shipping : <b>included</b></p>
          </ListGroup.Item>
  
          <ListGroup.Item>
                  <p>Tax : <b>included</b></p>
          </ListGroup.Item>
  
          <ListGroup.Item>
                  <p className='text-danger'>Total Price : <b>$120</b></p>
          </ListGroup.Item>
  
          <ListGroup.Item>
  
            <div className="d-grid gap-2">
                  <Button variant='danger' size='md' type="button">Mark as delivered</Button>
            </div>
          </ListGroup.Item>
  
        </ListGroup>
      </Col>
  
    </Row>
  </Container>
  )
  }

export default AdminOrderDetails