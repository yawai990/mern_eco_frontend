import {useEffect, useState} from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AdminLinks } from '../../../components';

import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';

const UserPage = ( { fetchUsers, deleteUser } ) => {
    const [ users, setUsers ] = useState([]);
    const [ deletedUser, setDeletedUser ] = useState(false);
    const dispatch  = useDispatch();

    const deleteHandler=async ( id )=>{
        
        if(window.confirm('Are your sure?')){
           const data = await deleteUser(id);

           if( data === 'user deleted') {
            setDeletedUser(!deletedUser)
           }
        }
      };
   
    useEffect(()=>{
        // canceling the database connection
        const abctl = new AbortController();

        fetchUsers(abctl)
        .then(resp => setUsers(resp))
        .catch(err => dispatch(logout()));

        //to avoid memory leakage, if connection is very slow , it cancel to connect to database
        return () => abctl.abort();
    },[deletedUser]);


    return (
        <Row className='m-5'>
          <Col md={2}>
            <AdminLinks />
          </Col>
          <Col md={10}>
            <h3 className='fw-bold'>User List</h3>
     
    
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
                    users.map((item,ind)=>(
              <tr key={ind}>
              <td>{ind + 1}</td>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>
                { 
                    item.isAdmin ? 
                    <i className='bi bi-check-lg text-success'></i>:
                    <i className='`bi bi-x-lg text-danger'></i>
                }
              </td>
             
              <td>
                <LinkContainer to='/admin/edit-user'>
                <Button variant='primary' className='btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </Button>
                </LinkContainer>
                {' / '}
                <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(item._id)}>
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

export default UserPage