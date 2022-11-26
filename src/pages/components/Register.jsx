import React,{useState} from 'react';
import { Container, Row,Col,Form,Button,Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPageComponent = ( { registerUser } ) => {
  const [validated, setValidated] = useState(true);
  const [ userCreateResp, setUserCreateResp ] = useState({success:'',error:'',loading:false});
  
  const handleSubmit = (event) => {

    event.preventDefault();
    event.stopPropagation();

    setUserCreateResp({...userCreateResp,loading:true});
    const form = event.currentTarget;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const email =form.email.value;
    const password = form.password.value;

    if (form.checkValidity() === true && name && email && lastName && password) {
      const registerUserData = { name,lastName,email,password};

      registerUser(registerUserData)
      .then(resp => {
        setUserCreateResp({success: resp.success ,loading:false});

        window.location.href = '/';
      })
      .catch(err => setUserCreateResp({error: err.response.data ,loading:false}))
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

        <Form.Group className='mb-3'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            id='name'
            placeholder="Enter Your Name"
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Your Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Your Last name"
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Last Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Email Address</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            id ='password'
            autoComplete="false"
            placeholder="Enter Password"
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Password</Form.Control.Feedback>
          <Form.Text className='text-muted'>Password should have at least 6 characters</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="c_password"
            id='c_password'
            autoComplete="false"
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
        {
          userCreateResp.loading && 
        <Spinner size='sm' animation='border' as='span' aria-hidden='true' role='status ' />
        }
        Submit
        </Button>

        {
          userCreateResp.error && 
      <Alert variant='danger' className='mt-2'>{userCreateResp.error}</Alert>
        }

      {
        userCreateResp.success &&
      <Alert variant='success' className='mt-2'>{userCreateResp.success}</Alert>
      }

    </Form>
          </Col>
      </Row>
    </Container>
  )
}

export default RegisterPageComponent;