import axios from 'axios';
import { useState, useEffect} from 'react';
import { Row, Col, Table, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AdminLinks } from '../../../components';

import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';


const ProductsPage = ( { fetchProducts, deleteProduct } ) => {
    const [ products, setProducts ] = useState([]);
    const [ productDeleted, setproductDeleted ] = useState(false);
    const dispatch = useDispatch();

    const deleteHandler=async (id)=>{

        if(window.confirm("Are your sure?")) {

        const  data = await deleteProduct(id);

        if( data.message === 'Product removed') {
            setproductDeleted(!productDeleted)
        }else setProducts([
            { name : data.message}
        ])
    }   
  }

    useEffect(()=>{
        const abctl =new AbortController();

        fetchProducts(abctl)
        .then(resp => setProducts(resp))
        .catch(err => dispatch(logout()));
 
        return () => abctl.abort();
    },[ productDeleted ]);


    return (
        <Row className='m-5'>
          <Col md={2}>
            <AdminLinks />
          </Col>
          <Col md={10}>
            <h3 className='fw-bold'>Product List
            {' '}
    
            <LinkContainer to='/admin/create-new-products'>
            <Button variant='primary' size='lg'>Create New</Button>
            </LinkContainer>
    
            </h3>
     
    
          <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Eidt/Delete</th>
            </tr>
          </thead>
          <tbody>
    
            {
              products.map((item,ind)=>(
            <tr key={!item._id ? item._id: ind}>
              <td>{ind + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <LinkContainer to={`/admin/edit-product/${item._id}`}>
                <Button variant='primary' className='btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </Button>
                </LinkContainer>
                {' / '}
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(item._id)}>
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

export default ProductsPage