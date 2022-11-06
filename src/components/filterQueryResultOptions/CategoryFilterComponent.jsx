import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <>
    <h5 className="fw-bold">Category</h5>
    <Form>
      {
      Array.from({length:5}).map((_,ind) => (
        <div key={ind} className="mb-3">
          <Form.Check type='checkbox' id={`cat-api-${ind}`}>
            <Form.Check.Input type='checkbox' isValid />
            <Form.Check.Label style={{cursor:'pointer'}}>{`category - ${ind}`}</Form.Check.Label>

          </Form.Check>
        </div>
      ))}
    </Form>
    </>
  );
};

export default CategoryFilterComponent;
