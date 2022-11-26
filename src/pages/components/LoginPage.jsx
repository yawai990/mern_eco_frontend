import {useState} from 'react';
import { Container,Row,Col,Form,Button,Alert,Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPageComponent = ( { LoginPageApiRequest,reduxDispatch, setReduxUserState } ) => {
    const [validated, setValidated] = useState(false);
    const [ loginUserResponse, setLoginUserResponse ] = useState({success:'',error:'',loading:false});
   
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

      const form = event.currentTarget.elements;

       const email = form.email.value;
      const password = form.password.value;
      const doNotLogout = form.doNotLogout.checked;

      if (event.currentTarget.checkValidity() === true && email && password) {

        setLoginUserResponse({loading:true});

        LoginPageApiRequest(email,password,doNotLogout)
        .then(resp => {

            setLoginUserResponse({success:resp.success, loading:false,err:''});

            if(resp.userLoggedIn) reduxDispatch(setReduxUserState(resp.userLoggedIn))

        resp.success === 'User Logged in' && resp.userLoggedIn.isAdmin ? window.location.href = '/admin/orders' : window.location.href ='/user';

        })
        .catch(err => setLoginUserResponse({error:err.response ? err.response.data : 'Connection interrupted'}));
      }
   
      setValidated(true);
    };


    return (
      <Container>
        <Row className='mt-3 justify-content-md-center'>
  
            <Col md={6}>
              <h4 className='fw-bold'>Login</h4>
  
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
  
          <Form.Group  className='mb-3'>
            <Form.Label>Your Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              id='email'
              autoComplete = 'false'
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
              id="password"
              placeholder="Enter Password"
              autoComplete ='false'
            />
            <Form.Control.Feedback type='invalid'>Please Enter a valid Password</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className='mb-3'>
            <Form.Check name='doNotLogout' type='checkbox' id='donotlogout' label='Do Not Logout' defaultChecked={false} />
          </Form.Group>
  
  
          <Row className='mb-2'>
            <Col>
            Don't you have an account ?
            <Link to='/register'> Register </Link>
            </Col>
          </Row>
         
        <Button type="submit">
            {
                loginUserResponse.loading && <Spinner size='sm' animation='border' as='span' aria-hidden='true' role='status ' />
            }
         Login
          </Button>

          {
            loginUserResponse.error && <Alert variant='danger' className='mt-2'>{loginUserResponse.error}</Alert>
          }
  
      </Form>
            </Col>
        </Row>
      </Container>
    )
  }
  
  export default LoginPageComponent;