import React, { useState, useEffect } from 'react';
import './materials.css'; // CSS file for styling
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LayoutNew from "../Layout";

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/packing-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status change (e.g., marking as delivered)
  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/packing-orders/${id}`, { status: 'Delivered' });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePrintClick = async () => {
    const element = document.getElementById('printableTable');

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    // Add a header
    pdf.setFontSize(18); // Set header font size
    pdf.text('GREEN_MART', 10, 10); // Add header text

    // Add subheader (optional)
    pdf.setFontSize(12);
    pdf.text('Packaging Orders Report - ' + new Date().toLocaleDateString(), 10, 20); // Add date below header

    pdf.addImage(imgData, 'PNG', 10, 30, 190, 0);

    pdf.save('packaging-orders.pdf');
  };

  return (
    <LayoutNew>
      
    <div className="order-container">
      <h2>Packing Orders</h2>
      <button 
      onClick={() => handlePrintClick()}
      className="print-btn">
        Print Doc
      </button>
      <hr/>
      <div id="printableTable">
      <table className="order-table">
        <thead>
          <tr>
            <th>Pa_Id</th>
            <th>Pro_Id</th>
            <th>Quantity</th>
            <th>Material</th>
            <th>Custom Color</th>
            <th>Selected Pattern</th>
            <th>Custom Note</th>
            <th>Ordered Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.pa_id}</td>
              <td>{order.pro_id}</td>
              <td>{order.quantity}</td>
              <td>{order.material}</td>
              <td>{order.customColor}</td> {/* Display custom color */}
              <td>{order.selectedPattern}</td> {/* Display selected pattern */}
              <td>{order.customNote}</td>
              <td>{order.deliverDate}</td>
              <td>
                {order.status !== 'Delivered' ? (
                  <button onClick={() => handleStatusChange(order._id)} className="deliver-btn">
                    Deliver
                  </button>
                ) : (
                  <span>Delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </LayoutNew>
  );
};

export default Order;
