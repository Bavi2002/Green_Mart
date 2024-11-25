// ReturnList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReturnForm from './ReturnForm'; // Import ReturnForm component

const ReturnList = () => {
  const [returns, setReturns] = useState([]);
  const [selectedReturn, setSelectedReturn] = useState(null);

  useEffect(() => {
    axios.get('https://your-api-endpoint.com/api/returns') // Specify full URL or configure axios
      .then(response => setReturns(response.data))
      .catch(error => console.error('Error fetching returns:', error));
  }, []);

  const handleReturnSaved = () => {
    axios.get('https://your-api-endpoint.com/api/returns') // Specify full URL or configure axios
      .then(response => setReturns(response.data))
      .catch(error => console.error('Error fetching returns:', error));
  };

  return (
    <div>
      <h1>Product Returns</h1>
      <ReturnForm returnId={selectedReturn} onReturnSaved={handleReturnSaved} />
      <ul>
        {returns.map(returnItem => (
          <li key={returnItem._id}>
            {returnItem.orderId} - {returnItem.productId}
            <button className="buttons "onClick={() => {
              if (returnItem && returnItem._id) {
                setSelectedReturn(returnItem._id);
              }
            }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnList;
