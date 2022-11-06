import {useState} from 'react';
import { Alert,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AddtoCartMessage = () => {
    const [alert,setAlert] = useState(false);
  return (
    <Alert show={alert} variant='success' onClose={()=>setAlert(false)} dismissible>
        <Alert.Heading>This product was added to your cart!</Alert.Heading>

        <p>
          <Button variant='success' className='btn btn-sm'>Go Back</Button>
          { '  ' }
          <LinkContainer to='/cart'>
          <Button variant='danger' className='btn btn-sm'>Go To Cart</Button>
          </LinkContainer>
        </p>
    </Alert>
  )
}

export default AddtoCartMessage