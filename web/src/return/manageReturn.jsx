import React, { useState, useEffect } from 'react';
import './return.css'; // CSS file for styling
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LayoutNew from '../Layout'

const ManageReturn = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input

  // Fetch return request data from the backend
  const fetchInfo = async () => {
    await fetch('http://localhost:3000/api/getReturns')
      .then((res) => res.json())
      .then((data) => { setReturnRequests(data); })
      .catch((error) => console.error('Error fetching return requests:', error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [editIndex, setEditIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({});

  // Handle input changes during edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Enable edit mode for a specific row
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(returnRequests[index]);
  };

  // Save the edited return request
  const handleSaveClick = async () => {
    const requestId = returnRequests[editIndex]._id;

    try {
      const response = await fetch(`http://localhost:3000/api/returns/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedRequest = await response.json();
        const updatedRequests = [...returnRequests];
        updatedRequests[editIndex] = updatedRequest;
        setReturnRequests(updatedRequests);
        setEditIndex(-1); // Exit edit mode
      } else {
        console.error('Failed to save return request');
      }
    } catch (error) {
      console.error('Error saving return request:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
        console.log('Request to delete ID:', id); // Log the ID being deleted
        const response = await fetch(`http://localhost:3000/api/returns/${id}`, { method: 'DELETE' });

        if (response.ok) {
            setReturnRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
            console.log('Deleted successfully');
        } else {
            console.error('Failed to delete return request');
        }
    } catch (error) {
        console.error('Error deleting return request:', error);
    }
};


  // Print the return requests table
  const handlePrintClick = async () => {
    const element = document.getElementById('printableTable');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('GREEN_MART', 10, 10);
    pdf.setFontSize(12);
    pdf.text('Return Requests Report - ' + new Date().toLocaleDateString(), 10, 20);
    pdf.addImage(imgData, 'PNG', 10, 30, 190, 0);

    pdf.save('return-requests.pdf');
  };

  // Filter return requests based on search query
  const filteredRequests = returnRequests.filter((request) =>
    request.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LayoutNew>
    <div className="table-container">
      <h2>Manage Return Requests</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <button onClick={() => handlePrintClick()} className="print-btn">
        Print Doc
      </button>

      <div id="printableTable">
        <table className="return-table">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Product Name</th>
              <th>Order ID</th>
              <th>Email</th>
              <th>Address</th>
              <th>Reason</th>
              <th>Delivered Date</th>
              <th>Phone Number</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr key={request._id}>
                {editIndex === index ? (
                  <>
                    {/* <td>{request._id}</td> */}
                    <td>
                      <input
                        type="text"
                        name="productName"
                        value={editFormData.productName}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="orderId"
                        value={editFormData.orderId}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="reason"
                        value={editFormData.reason}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="deliveredDate"
                        value={new Date(editFormData.deliveredDate).toISOString().substring(0, 10)}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="image"
                        value={editFormData.image}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleSaveClick} className="save-btn">
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* <td>{request._id}</td> */}
                    <td>{request.productName}</td>
                    <td>{request.orderId}</td>
                    <td>{request.email}</td>
                    <td>{request.address}</td>
                    <td>{request.reason}</td>
                    <td>{new Date(request.deliveredDate).toLocaleDateString()}</td>
                    <td>{request.phoneNumber}</td>
                    <td>
                      <img
                        src={request.image}
                        alt="Return evidence"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(index)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(request._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </LayoutNew>
  );
};

export default ManageReturn;
