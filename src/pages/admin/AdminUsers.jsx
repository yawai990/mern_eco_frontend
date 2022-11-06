import React from 'react';
import {Row,Col,Table,Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AdminLinks } from '../../components';

const deleteHandler=()=>{
  if(window.confirm("Are your sure?")) alert('User deleted')
}

const AdminUsers = () => {
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>is Admin</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>

        {
          ['bi-check-lg text-success','bi-x-lg text-danger'].map((item,ind)=>(
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>Jhone</td>
          <td>Doe</td>
          <td>jhonedoe@gmail.com</td>
          <td>
            <i className={`bi ${item}`}></i>
          </td>
          <td>
            <LinkContainer to='/admin/edit-user'>
            <Button variant='primary' className='btn-sm'>
            <i className="bi bi-pencil-square"></i>
            </Button>
            </LinkContainer>
            {' / '}
            <Button variant='danger' className='btn-sm' onClick={deleteHandler}>
              <i className="bi bi-x-circle"></i>
            </Button>
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

export default AdminUsers