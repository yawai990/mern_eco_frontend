import {Row,Col,Container,Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserOrder = () => {
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
          ['bi-check-lg text-success','bi-x-lg text-danger'].map((item,ind)=>(
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>Mark</td>
          <td>2022-10-24</td>
          <td>$100</td>
          <td>
            <i className={`bi ${item}`}></i>
          </td>
          <td>
            <Link to='/user/order-details'>Go To Order</Link>
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

export default UserOrder