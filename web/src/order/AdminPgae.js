import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminOrdersPage.css';
import LayoutNew from '../Layout'

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cartItems/cart');
        const data = await response.json();
        console.log(data); // Debugging: check if products are properly fetched
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Export individual order to PDF
  const exportOrderToPDF = (order) => {
    const doc = new jsPDF();

    const tableColumn = ['Product Name', 'Quantity', 'Unit Price', 'Total'];
    const tableRows = [];

    (order.products || []).forEach(product => {
      const productData = [
        product.name,
        product.quantity,
        `$${product.price.toFixed(2)}`,
        `$${(product.price * product.quantity).toFixed(2)}`,
      ];
      tableRows.push(productData);
    });

    // Add order details at the top
    doc.setFontSize(12);
    doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`, 14, 25);
    doc.text(`Coupon Code: ${order.couponCode || 'N/A'}`, 14, 35);

    // Add space before the table
    doc.text(" ", 14, 45);

    // Create the products table
    doc.autoTable({
      startY: 50, // Adjust the table starting position
      head: [tableColumn],
      body: tableRows,
      margin: { top: 10 },
      styles: { halign: 'center', valign: 'middle' }, // Align cells centrally
      headStyles: { fillColor: [0, 102, 204] }, // Set header background color
      theme: 'grid', // Apply grid theme for better visual structure
    });

    // Save the PDF
    doc.save(`order_${order._id}.pdf`);
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <LayoutNew>
    <div className="admin-orders-page">
      <header className="admin-header">
        <h1>Admin - Orders Management</h1>
      </header>

      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search orders by ID or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              
              <th>Total Amount</th>
              <th>Coupon Code</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(order =>
                order._id?.includes(searchTerm) ||
                (order.status?.toLowerCase() || '').includes(searchTerm.toLowerCase())
              )
              .map(order => (
                <tr key={order._id}>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.couponCode || 'N/A'}</td>
                  <td>
                    <table className="nested-table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.products || []).map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>${(product.price * product.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <button
                      className="export-btn"
                      onClick={() => exportOrderToPDF(order)}
                    >
                      Export to PDF
                    </button>
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

export default AdminPage;
