import React,{useState} from 'react';
import { Container, Row,Col,Form,Button,Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [validated, setValidated] = useState(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChange = ()=>{
    const password= document.querySelector('input[name=password]');
    const confirm= document.querySelector('input[name=c_password]');

    if(password.value === confirm.value){
      confirm.setCustomValidity('')
    }else{
      confirm.setCustomValidity('Password do not match')
    }
  }
  return (
    <Container>
      <Row className='mt-3 justify-content-md-center'>

          <Col md={6}>
            <h4 className='fw-bold'>Register</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group controlId="validationCustom01" className='mb-3'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Enter Your Name"
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom02" className='mb-3'>
          <Form.Label>Your Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            placeholder="Your Last name"
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Last Name</Form.Control.Feedback>
        </Form.Group>

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
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Password</Form.Control.Feedback>
          <Form.Text className='text-muted'>Password should have at least 6 characters</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="c_password"
            placeholder="Repeat Address"
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Both Passwords should match</Form.Control.Feedback>
        </Form.Group>

        <Row className='mb-2'>
          <Col>
          Do you have an account ?
          <Link to='/login'> Login </Link>
          </Col>
        </Row>
       
      <Button type="submit">
        <Spinner size='sm' animation='border' as='span' aria-hidden='true' role='status ' />
        Submit
        </Button>

      <Alert variant='danger' className='mt-2'>User with that email already exists!</Alert>

      <Alert variant='success' className='mt-2'>User created.</Alert>

    </Form>
          </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage