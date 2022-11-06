import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
    {
      [
        {color:['red','green','blue']},
        {ram:['1TB','2TB']}
    ].map((item,idx)=>(
      <div className="mb-3" key={idx}>
        <Form.Label className='text-capitalize'>
          <b>{Object.keys(item)}</b>
          </Form.Label>

          {
            item[Object.keys(item)].map((data,ind)=>(
              <Form.Check type="checkbox" key={ind} label={data} />
            ))
          }

      </div>
      
    ))
    }
    </>
  );
};

export default AttributesFilterComponent;
