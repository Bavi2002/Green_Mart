import React, { useState } from 'react';
import axios from 'axios';
import './DeliveryForm.css';

const DeliveryForm = () => {
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Card number validation
  
    
    try {
      const response = await axios.post('/api/deliverys', {
        address,
        contact
      });
      console.log(response.data);
      alert('Delivery Details added successfully');
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('Delivery details failed to add');
    }
  };
  

  return (
    <div className="delivery-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
