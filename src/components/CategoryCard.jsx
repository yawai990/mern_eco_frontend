import React from 'react';
import { Card,Button,Container,Row  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CategoryCard = () => {
  const datas = [
    {id:1,img: '/images/tablet.jpg',name:'Tablet',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
    {id:2,img:' /images/laptop.jpg',name:'Laptop',desc:'Best Seller Laptop in the category.'},
    {id:3,img:'/images/watches.jpg',name:'Watches',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
    {id:4,img:'/images/watches02.jpg',name:'Watches',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
    {id:5,img:' /images/canoncamera.jpg',name:'Watches',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
]
  return (
    <Container>
    <Row xs={1} md={2} lg={3} className='mt-3'>
      {
        datas.map(data=>(
   
    <Card  className='border-0' key={data.id}>

        <Card.Img style={{height:'280px'}} variant='top' src= '/images/tablet.jpg' alt="tablet" />

        <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text style={{minHeight:'100px'}}>{data.desc}</Card.Text>

          <LinkContainer to='/product-list'>
            <Button variant='primary'>GO to the Category</Button>
            </LinkContainer>

        </Card.Body>
    </Card>
           
           ))
          }
    </Row>
      </Container>
  )
}

export default CategoryCard