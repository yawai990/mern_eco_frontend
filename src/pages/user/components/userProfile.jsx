import { useState, useEffect } from 'react';
import { Container,Row,Col,Form,Alert,Button } from 'react-bootstrap';


const UserProfileCom = ({ userInfo, getUser, userUpdate, setReduxUserState, reduxDispatch }) => {
  const [validated, setValidated] = useState(true);
  const [ userData, setUserData ] = useState({});
  const [ respData, setRespData ] = useState({success:'',loading:false,error:""});

  // console.log(userInfo)

  useEffect(()=>{
        setTimeout(()=>{
        setRespData({success:'',loading:false,error:''});
    },3000)

  },[respData])



  useEffect(()=>{
    getUser(userInfo._id)
    .then(resp => setUserData(resp))            
    .catch(err => setRespData({error: err}));

  },[userInfo._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
   event.stopPropagation();

    setRespData({loading:true});

    const form = event.currentTarget;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;

    if (form.checkValidity() === false) {
        const updateData ={name, lastName, email, phoneNumber,state, address, country, zipCode, city, password };

        userUpdate(updateData)
        .then(resp =>{
            setRespData( { success : resp.success } );
            reduxDispatch(setReduxUserState({doNotLogout: userInfo.doNotLogout,...resp.userUpdated}));

            if(userInfo.doNotLogout) localStorage.setItem('userInfo', JSON.stringify({ doNotLogout:true,...resp.userUpdated}))
            else sessionStorage.setItem('userInfo', JSON.stringify({ doNotLogout:false,...resp.userUpdated}))
        })
        .catch(err => setRespData( { error: err.response.data } ) )
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
            defaultValue={userData ? userData.name:null}
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicLastname" className='mb-3'>
          <Form.Label>Your Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            defaultValue={userData ? userData.lastName:null}
          />
          <Form.Control.Feedback type='invalid'>Please Enter Your Last Name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className='mb-3'>
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            disabled
            name='email'
            defaultValue ={userData ? userData.email:null}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone" className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phoneNumber'
            defaultValue={userData ? (userData.phoneNumber ? userData.phoneNumber:''):null}
            placeholder='Enter Your Phone Number'
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress" className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            defaultValue={userData.address ? userData.address : null}
            placeholder='Enter Your Street Name and house Number'
          />
        </Form.Group>

        <Form.Group controlId="formBasicCountry" className='mb-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            name='country'
            defaultValue={userData.country ? userData.country : ''}
            placeholder='Enter Your Country'
          />
        </Form.Group>

        <Form.Group controlId="formBasicZip" className='mb-3'>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type='text'
            name='zipCode'
            defaultValue={userData.zipCode ? userData.zipCode : ''}
            placeholder='Enter Your ZipCode'
          />
        </Form.Group>

        <Form.Group controlId="formBasicCity" className='mb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name = 'city'
            defaultValue={userData.city ? userData.city:''}
            placeholder='Enter Your City'
          />
        </Form.Group>

        <Form.Group controlId="formBasicState" className='mb-3'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            name='state'
            placeholder='Enter Your State'
            defaultValue={userData.state ? userData.state:''}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            autoComplete='false'
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Please Enter a valid Password</Form.Control.Feedback>
          <Form.Text className='text-muted'>Password should have at least 6 characters</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword1" className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="c_password"
            placeholder="Repeat Address"
            autoComplete='false'
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type='invalid'>Both Passwords should match</Form.Control.Feedback>
          </Form.Group>

       
      <Button type="submit">
        Update
        </Button>

        {
            respData.error && 
      <Alert variant='danger' className='mt-2'>Something went wrongs!</Alert>
        }

        {
            respData.success === 'User updated' && 
      <Alert variant='success' className='mt-2'>User updated.</Alert>
        }

    </Form>
          </Col>
      </Row>
    </Container>
  )
}

export default UserProfileCom;