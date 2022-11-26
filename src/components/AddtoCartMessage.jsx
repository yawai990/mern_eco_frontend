import { Alert,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate  } from 'react-router-dom';

const AddtoCartMessage = ({ showCartMessage, setShowCartMessage }) => {

  const navigate = useNavigate();

  const goback = () => navigate(-1)

  return (
    <Alert show={showCartMessage} variant='success' onClose={()=>setShowCartMessage(false)} dismissible>
        <Alert.Heading>This product was added to your cart!</Alert.Heading>

        <p>
          <Button variant='success' className='btn btn-sm' onClick={goback}>Go Back</Button>
          { '  ' }
          <LinkContainer to='/cart'>
          <Button variant='danger' className='btn btn-sm'>Go To Cart</Button>
          </LinkContainer>
        </p>
    </Alert>
  )
}

export default AddtoCartMessage