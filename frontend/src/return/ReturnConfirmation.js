import React from 'react';
import './ReturnConfirmation.css';

const ReturnConfirmation = () => {
  return (
    <div className="confirmation-box">
      <h1>Return Request Successfully Received!</h1>
      <p>Thank you for your request. We have successfully received your return request for the following item(s):</p>
      <div className="order-details">
        <p><strong>Order ID:</strong> #789012</p>
        <p><strong>Product:</strong> Organic Almonds (1 lb)</p>
        <p><strong>Return Reason:</strong> Incorrect Item Received</p>
      </div>
      <p>We will process your request and notify you with further instructions.</p>
      <a href="/products">Return to Order History</a>
    </div>
  );
};

export default ReturnConfirmation;
