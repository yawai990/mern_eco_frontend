import {useState} from 'react';
import { Container,Row,Col,Form,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminEditUser = () => {
  const [validated,setValidated] = useState(false);

  const handleSubmit = (e)=>{
    const form=e.currentTarget;

    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true)
  }

return (
  <Container>

    <Row className='justify-content-md-center mt-4'>

            <Col md={1}>
              <Link to="/admin/userslist" className='btn btn-info my-3'>Go Back</Link>
            </Col>
            <Col md={6}>
              <h3 className="fw-bold">Edit User</h3>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control name='name'  required type='text' defaultValue='admin' />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control name='name'  required type='text' defaultValue='admin' />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name='name'  required type='email' defaultValue='admin@gmail.com' />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Check name='name'  required type='checkbox' defaultValue='admin@gmail.com' label='is admin' checked />
                </Form.Group>
    
                <Button variant='primary' type="submitx">Update</Button>
              </Form>

            </Col>
    </Row>

  </Container>
)
}

export default AdminEditUser