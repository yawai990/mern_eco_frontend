import { Row,Col,Table } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { AdminLinks } from "../../components";

const AdminOrders = () => {
  return (
    <Row className='m-5'>
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h3 className='fw-bold'>My Orders</h3>
 

      <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Date</th>
          <th>Total</th>
          <th>Delivered</th>
          <th>Payment Method</th>
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
          <td>Paypal</td>
          <td>
            <Link to='/admin/order-details'>Go To Order</Link>
          </td>
        </tr>
          ))
        }

      </tbody>
    </Table>
    </Col>

    </Row>
  )
}

export default AdminOrders