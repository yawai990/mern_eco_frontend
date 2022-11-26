import { Row,Col,Table } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { AdminLinks } from "../../../components";
import { useEffect, useState} from 'react';

import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';

const Order = ( { fetchOrders }) => {
     const [ orders, setOrders ] = useState([]);
     const dispatch = useDispatch();
  
    useEffect(()=>{

        const abctl  = new AbortController();
            fetchOrders(abctl)
            .then( resp => setOrders(resp))
            .catch(err => dispatch(logout()));

        return () => abctl.abort();
    },[]);

    return (
        <Row className='m-5'>
          <Col md={2}>
            <AdminLinks />
          </Col>
          <Col md={10}>
            <h3 className='fw-bold'>Order List</h3>
     
    
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
              orders?.map((item,ind)=>(
            <tr key={item._id ? item._id : ind}>
              <td>{ind + 1}</td>
              <td>{ item.user !== null ? `${item.user.name} ${item.user.lastName}`: null }</td>
              <td>{item.createdAt.substring(0,10)}</td>
              <td>{item.orderTotal.cartSubTotal}</td>
              <td>
                { item.isDelivered ? <i className='bi bi-check-lg text-success'></i>:<i className='bi-x-lg text-danger'></i>}
                
              </td>
              <td>{item.paymentMethod}</td>
              <td>
                <Link to={`/admin/order-details/${item._id}`}>Go To Order</Link>
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

export default Order