import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, fetchProductDetail, removeProductDetail } from '../features/slice/productsSlice';
import { addToCart, getCartItemQuantity } from '../features/slice/cartSlice';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const item = useSelector(getProductDetail);
  const { id } = useParams();
  
  // Fetch the current quantity of the product in the cart
  const cartQuantity = useSelector((state) => getCartItemQuantity(state, id));

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    return () => {
      dispatch(removeProductDetail());
    };
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    if (cartQuantity < item.countInStock) {
      dispatch(addToCart(item));
    } else {
      setError('Cannot add more than available stock');
      setTimeout(() => setError(''), 3000); 
    }
  };

  return (
    <div className="productscreen">
      {error && <div className="error-message">{error}</div>}
      <br />
      <div className="productscreen-left">
        <div className="left-image">
          <img src={item.imageUrl} alt={item.name} />
        </div>

        <div className="left-info">
          <p className="left-name">{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Description: {item.description}</p>
        </div>
      </div>

      <div className="productscreen-right">
        <div className="right-info">
          <p>Price: <span>${item.price}</span></p>
          <p>Status: <span>{item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          <p>Qty in stock: <span>{item.countInStock}</span></p>
          <p>
            <button
              type="button"
              onClick={() => handleAddToCart(item)}
            >
              Add to cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
