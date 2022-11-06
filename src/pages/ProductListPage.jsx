import React from 'react';
import {Container,Row,Col,ListGroup, Button} from 'react-bootstrap';
import { Pagination,Sorting,ProductForList } from '../components';
import {RatingFilter,PriceFilter,CategoryFilter,AttributeFilter} from '../components/filterQueryResultOptions';

const ListItems =[
  <Sorting />,
  <PriceFilter />,
  <RatingFilter />,
  <CategoryFilter />,
  <AttributeFilter />
]

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
      <Col md={3}>
        <ListGroup variant='flush'>

            {
              ListItems.map((com,ind)=>(

                    <ListGroup.Item className='my-2' key={`list-component-${ind}`}>
                      {com}
                    </ListGroup.Item>
              ))
            }

                    <ListGroup.Item>
                      <Button className="bg-primary border-0 d-block btn btn-md">Filter</Button>
                      <Button className="bg-danger border-0 d-block btn btn-md">danger</Button>
                    </ListGroup.Item>
        </ListGroup>
      </Col>
      
      <Col md={9}>
          <ProductForList />
          <Pagination />
          
      </Col>
      </Row>
    </Container>
  )
}

export default ProductListPage