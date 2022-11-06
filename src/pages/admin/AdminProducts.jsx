import {Row,Col,Table,Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AdminLinks } from '../../components';

const deleteHandler=()=>{
  if(window.confirm("Are your sure?")) alert('Product deleted')
}

const AdminProducts = () => {
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
          [
            {name:'Panasonic',price:'$250',category:'TV'},
            {name:'Lenovo',price:'$1465',category:'Laptops'},
            {name:'GTA 10',price:'$345',category:'Games'},
          ].map((item,ind)=>(
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.category}</td>
          <td>
            <LinkContainer to='/admin/edit-product'>
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
export default AdminProducts