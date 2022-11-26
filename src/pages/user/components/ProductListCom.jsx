import { useEffect, useState } from 'react';
import {Container,Row,Col,ListGroup, Button} from 'react-bootstrap';
import { Pagination,Sorting,ProductForList } from '../../../components';
import {RatingFilter,PriceFilter,CategoryFilter,AttributeFilter} from '../../../components/filterQueryResultOptions';

const ListItems =[
  <Sorting />,
  <PriceFilter />,
  <RatingFilter />,
  <CategoryFilter />,
  <AttributeFilter />
];


const ProductListPageCom = ({fetchProducts}) => {

    const [ productLists, setProductLists ] = useState([]);
    const [ pageNum, setPageNum ] = useState(1);
    const [ pagiPage, setPagiPage ] = useState(1);

    const setActivePage = (pageNumber) =>setPageNum(pageNumber);

    useEffect(()=>{
        fetchProducts(pageNum)
        .then(resp => {
            setProductLists(resp.products)
            setPageNum(resp.pageNum)
            setPagiPage(resp.paginationLinksNumber)
        })
        .catch(err => (err));

    },[pageNum])

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
          <ProductForList productLists={productLists} />
          <Pagination pageNum={pageNum} pagiPage={pagiPage} setActivePage={setActivePage} />
          
      </Col>
      </Row>
    </Container>
  )
}

export default ProductListPageCom;