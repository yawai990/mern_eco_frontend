import React from 'react';
import './chat.css';

const UserChat = () => {
  return (
    <>
    <input type="checkbox" id="check" />

    <label htmlFor="check" className='check-btn'>

      <span className="position-absolute top-0 start-5 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
    <i className="bi bi-chat-dots message"></i>
    <i className="bi bi-x-circle close"></i>
    </label>

    <div className="chat-wrapper">
      <div className="chat-header">
        <h6>Let ' s Chat - Online</h6>
      </div>

      <div className='chat-form p-3'>

        <div className="chat-msg">

          {
            Array.from({length:20}).map((_,id)=>(
              <div key={id}>
          <p className='p-2 text-light rounded bg-secondary me-4'>
            <b>Your Wrote:</b> Hello, WORLD ! This is a toast message.
          </p>


          <p className="bg-primary p-2 ms-4 text-light rounded">
          <b>Support Wrote:</b>Hello, WORLD ! This is a toast message.
          </p>
          </div>
            ))
                      }

        </div>
        <textarea name="" 
        id="clientChatMsg"
        className="form-control" placeholder='Your Text Message'>
            </textarea>

            <button className="btn btn-success btn-block">Submit</button>
      </div>
    </div>
    </>
  )
}

export default UserChat