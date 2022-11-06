import {useState} from 'react';
import { Container,Row,Col,Form,Button,Alert,Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [validated, setValidated] = useState(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className='mt-3 justify-content-md-center'>

          <Col md={6}>
            <h4 className='fw-bold'>Login</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group controlId="validationCustom02" className='mb-3'>
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Your Email Address"
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Email Address</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Password</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check name='doNotLogout' type='checkbox' label='Do Not Logout' />
        </Form.Group>


        <Row className='mb-2'>
          <Col>
          Don't you have an account ?
          <Link to='/register'> Register </Link>
          </Col>
        </Row>
       
      <Button type="submit">
      <Spinner size='sm' animation='border' as='span' aria-hidden='true' role='status ' />
       Login
        </Button>

      <Alert variant='danger' className='mt-2'>Wrong Credentials!</Alert>


    </Form>
          </Col>
      </Row>
    </Container>
  )
}

export default LoginPage