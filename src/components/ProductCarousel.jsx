import React from 'react';
import { Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const carouselData = [
    {id:1,img:'/images/carousel/watches.jpg',name:'Watches',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
    {id:2,img:'/images/carousel/laptop.jpg',name:'Laptop',desc:'Best Seller Laptop in the category.'},
    {id:3,img:'/images/carousel/camera.jpg',name:'Camera',desc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati officia laborum, quae minus dicta deserunt esse sit dolor similique.'},
]

const ProductCarousel = () => {
  return (
   <Carousel fade>
    {
        carouselData?.map(carousel=>(
            <Carousel.Item key={carousel.id}> 
            <img crossOrigin='anonymous' style={{maxHeight:'320px',objectFit:'cover'}} src={carousel.img} className='d-block w-100 img-fluid' alt={carousel.name} />
            <Carousel.Caption>

            <LinkContainer style={{cursor:'pointer'}} to='/product-details'>
                <h4 className={`${carousel.name === 'Camera' && 'text-muted'}`}>{carousel.name}</h4>
            </LinkContainer>

                <p className={`${carousel.name === 'Camera' ? 'text-muted fs-5':' fs-5'}`}>{carousel.desc}</p>
            </Carousel.Caption>
    </Carousel.Item>
        ))
    }

   </Carousel>
  )
}

export default ProductCarousel