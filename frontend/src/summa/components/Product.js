import React from 'react'
import {Link} from 'react-router-dom';

const Product = ({name, price, id, imageUrl, description}) => {
  return (
    <div className='product'>
        <img src={imageUrl} alt={name} />
        <div className="product-info">
            <p className="info-name">{name}</p>
            <p className="info-description">{description.substring(0, 100)}...</p>
  
            <p className='info-price'>${price}</p>
            <Link to={`/product/${id}`} className='info-button'>
                View
            </Link>
        </div>
    </div>
  )
}

export default Product