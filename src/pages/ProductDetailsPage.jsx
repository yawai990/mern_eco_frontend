import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const {id} = useParams(); //get the id from url query

  console.log(id)
  return (
    <div>ProductDetailsPage</div>
  )
}

export default ProductDetailsPage