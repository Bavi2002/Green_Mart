import React from 'react';
import { useSelector } from 'react-redux';
import { getCartItems, getCartTotal } from '../features/slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen = () => {
  const cartItems = useSelector(getCartItems);
  const cartTotalAmount = useSelector(getCartTotal);
  const navigate = useNavigate();

  
  // Dummy discount amount
  const discountAmount = 10; // Replace with actual logic to get discount
  const totalAmount = cartTotalAmount - discountAmount;

  const handleConfirmOrder = () => {
    // Perform order confirmation logic here
  
    // Example: passing subtotal, discount, and total
    navigate('/itemdetails', { 
      state: { 
        subtotal: cartTotalAmount, 
        discount: discountAmount, 
        total: totalAmount,
        items: cartItems // Pass cart items here
      } 
    });
  };
  


  return (
    <div className="checkoutscreen">
      <div className="checkoutscreen-box">
        {cartItems.map(item => (
          <div key={item._id} className="checkoutscreen-box-item">
            <div className="checkoutscreen-box-item-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="checkoutscreen-box-item-info">
              <p className="checkoutscreen-box-item-name">{item.description}</p>
              <p>{item.description}</p>
              <p className="checkoutscreen-box-item-price">${item.price}</p>
            </div>
            <div className="checkoutscreen-box-item-quantity">
              <p>Qty: {item.cartQuantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkoutscreen-summary">
        <p>Subtotal: <span>${cartTotalAmount.toFixed(2)}</span></p>
        <p>Discount: <span>${discountAmount.toFixed(2)}</span></p>
        <p>Total: <span>${totalAmount.toFixed(2)}</span></p>
        <div className="checkoutscreen-buttons">
          <button className="checkoutscreen-button" onClick={handleConfirmOrder}>Confirm Order</button>
          <button className="checkoutscreen-button">Package Option</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
