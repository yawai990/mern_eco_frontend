import {useState} from 'react';
import {Rating} from 'react-simple-star-rating';
import {Form} from 'react-bootstrap';

const RatingFilterComponent = () => {
  return (
    <div>
      <h5>Rating</h5>

      {
        Array.from({length:5}).map((_,ind)=>(
      <Form.Check type="checkbox" id={`check-api-${ind}`} key={ind}>
          <Form.Check.Input type='checkbox' isValid />
          <Form.Check.Label style={{cursor:'pointer'}}>
            <Rating size={20} initialValue={5-ind} readonly />
          </Form.Check.Label>
      </Form.Check>
        ))
      }
      
    </div>
  );
};

export default RatingFilterComponent;
