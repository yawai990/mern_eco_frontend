import {useState} from 'react';
import { Container,Row,Col,Form,Alert,Button } from 'react-bootstrap';

const UserProfile = () => {
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
            <h4 className='fw-bold'>Change Your Profile</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            defaultValue='Yawai'
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicLastname" className='mb-3'>
          <Form.Label>Your Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            defaultValue="Aung"
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Last Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className='mb-3'>
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            disabled
            value='yawai@gmail.com'
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone" className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            disabled
            placeholder='Enter Your Phone Number'
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress" className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            disabled
            placeholder='Enter Your Street Name and house Number'
          />
        </Form.Group>

        <Form.Group controlId="formBasicCountry" className='mb-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            disabled
            defaultValue='Myanmar'
            placeholder='Enter Your Country'
          />
        </Form.Group>

        <Form.Group controlId="formBasicZip" className='mb-3'>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type='text'
            disabled
            defaultValue='11011'
            placeholder='Enter Your ZipCode'
          />
        </Form.Group>

        <Form.Group controlId="formBasicCity" className='mb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            disabled
            defaultValue='Yangon'
            placeholder='Enter Your City'
          />
        </Form.Group>

        <Form.Group controlId="formBasicState" className='mb-3'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            disabled
            placeholder='Enter Your State'
            defaultValue='Yangon'
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            defaultValue={123456}
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
            defaultValue={123456}
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Both Passwords should match</Form.Control.Feedback>
          </Form.Group>

       
      <Button type="submit">
        Update
        </Button>

      <Alert variant='danger' className='mt-2'>User with that email already exists!</Alert>

      <Alert variant='success' className='mt-2'>User updated.</Alert>

    </Form>
          </Col>
      </Row>
    </Container>
  )
}

export default UserProfile