import {useState} from 'react'
import { Toast,Form,Button,FormGroup } from 'react-bootstrap';

const AdminChatRoom = () => {
    const [toast1,setToast1] = useState(true);

    const close1=()=>setToast1(false);
    
  return (
    <>
    <Toast show={toast1} onClose={close1} className="ms-4 mb-5">
        <Toast.Header>
            <strong className='me-auto'>Chat with Jhon Doe</strong>
        </Toast.Header>

        <Toast.Body>

            <div style={{maxHeight:'200px',overflow:'auto'}}>

            {
                Array.from({length:30}).map((_,ind)=>(
                    <div key={ind}>
                            <p className='bg-primary rounded-pill ms-5 p-2 text-light'>
                            <b>User wrote :</b>Hello World, This is chat message
                            </p>

                                <p className='me-5'>
                                <b>Admin wrote :</b>Hello World, This is chat message
                                </p>
                    </div>
                ))
            }
            </div>

            <Form className='mt-3'>
                <FormGroup className='mb-3'>
                    <Form.Label>Write Message</Form.Label>
                    <Form.Control as="textarea" type="text" style={{resize:'none'}} />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        </Toast.Body>
    </Toast>
    </>
  )
}

export default AdminChatRoom