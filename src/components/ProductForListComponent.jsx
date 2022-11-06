import { Card, Button,Row,Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductForListComponent = () => {
  return (
    <>
      {
        Array.from({length:5}).map((_,ind)=>(
    
    <Card style={{marginTop:'30px',marginBottom:'50px'}} key={ind}>

      <Row>

        <Col lg={5}>
        <Card.Img variant="top" src="/images/tablet.jpg" style={{height:'260px',objectFit:'cover'}} />
        </Col>

        <Col lg={7}>
        <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>

        <Card.Text>
          <Rating initialValue={5} size={20} readonly /> (10)
        </Card.Text>

        
        <Card.Text className="h4">
          $545

          <LinkContainer to="/product-details">
        <Button variant="danger" className='ms-2 btn-sm'>See Product</Button>
        </LinkContainer>
        </Card.Text>
 

      </Card.Body>
        </Col>

      </Row>

    </Card>
    ))
  }
  </>
  );
};

export default ProductForListComponent;
