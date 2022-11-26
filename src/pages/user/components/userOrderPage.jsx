import {Row,Col,Container,Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserOrderCom = ({ getOrders }) => {

  const [ errMessage, setErrMessage ] = useState('');
  const [ orders, setOrders] = useState();

  useEffect(()=>{
    getOrders()
    .then(resp => setOrders(resp))
    .catch(error => setErrMessage(error.message))
  },[]);

  return (
    <Container>
    <Row className='m-2'>
      <Col md={12}>
        <h3 className='fw-bold'>My Orders</h3>
      </Col>

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Date</th>
          <th>Total</th>
          <th>Delivered</th>
          <th>Order Details</th>
        </tr>
      </thead>
      <tbody>

        {

      orders?.map((order,ind)=>(
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>You</td>
          <td>{order.createdAt.substring(0,10)}</td>
          <td>$ {order.orderTotal.cartSubTotal}</td>
          <td>

              {
                order.isDelivered ?
                 <i className='bi bi-check-lg text-success'></i> :
                 <i className='bi bi-x-lg text-danger'></i>
              }

          </td>
          <td>
            <Link to={`/user/order-details/${order._id}`}>Go To Order</Link>
          </td>
        </tr>
          ))
        }

      </tbody>
    </Table>

    </Row>
    </Container>
  )
}

export default UserOrderCom;