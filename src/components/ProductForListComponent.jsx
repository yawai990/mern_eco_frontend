import { Card, Button,Row,Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductForListComponent = ({productLists}) => {
  
  return (
    <>
      {
        productLists.map((product,ind)=>(
    
    <Card style={{marginTop:'30px',marginBottom:'50px'}} key={product._id}>

      <Row>

        <Col lg={5}>
        <Card.Img variant="top" src={productLists[ind]?.images[0]?.path ? productLists[ind].images[0].path :''} style={{height:'260px',objectFit:'cover'}} />
        </Col>

        <Col lg={7}>
        <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>

        <Card.Text>
          <Rating initialValue={product.rating} size={20} readonly /> (10)
        </Card.Text>

        
        <Card.Text className="h4">
          ${product.price}

          <LinkContainer to={`/product-details/${product._id}`}>
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
