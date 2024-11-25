import React, { useState, useEffect } from 'react';
import './materials.css'; // CSS file for styling
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LayoutNew from "../Layout";


const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input

  const fetchInfo = async () => {
    const res = await fetch('http://localhost:3000/api/packaging-materials');
    const data = await res.json();
    setMaterials(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [editIndex, setEditIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({
    packagingMaterial: '',
    internalMeasurement: '',
    weightLimit: '',
    description: '',
    features: '',
    uploadImage: '',
  });

  // Handle input changes during edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Enable edit mode for a specific row
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData({
      packagingMaterial: materials[index].packagingMaterial,
      internalMeasurement: materials[index].internalMeasurement,
      weightLimit: materials[index].weightLimit,
      description: materials[index].description,
      features: materials[index].features.join(', '), // Convert array to string for input
      uploadImage: materials[index].uploadImage,
    });
  };

  const handlePrintClick = async () => {
    // Hide the Actions row and buttons before printing
    const actionElements = document.querySelectorAll('.action, .button');
    actionElements.forEach(el => el.style.display = 'none');
  
    // Hide the last column (Actions column) in all rows
    const table = document.getElementById('printableTable');
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const lastCell = row.querySelector('td:last-child, th:last-child');
      if (lastCell) lastCell.style.display = 'none';
    });
  
    // Capture the table as canvas
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL('image/png');
  
    // Create a PDF
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('GREEN_MART', 10, 10);
    pdf.setFontSize(12);
    pdf.text('Packaging Materials Report - ' + new Date().toLocaleDateString(), 10, 20);
    pdf.addImage(imgData, 'PNG', 10, 30, 190, 0);
  
    // Restore the last column visibility
    rows.forEach(row => {
      const lastCell = row.querySelector('td:last-child, th:last-child');
      if (lastCell) lastCell.style.display = '';
    });
  
    // Save the PDF
    pdf.save('packaging-materials.pdf');
  };
  

  // Save the edited row
  const handleSaveClick = async () => {
    const materialId = materials[editIndex]._id;

    // Convert features back to an array
    const featuresArray = editFormData.features.split(',').map(f => f.trim());

    const updatedData = {
      packagingMaterial: editFormData.packagingMaterial,
      internalMeasurement: editFormData.internalMeasurement,
      weightLimit: editFormData.weightLimit,
      description: editFormData.description,
      features: featuresArray, // Make sure this is an array
      uploadImage: editFormData.uploadImage,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/packaging-materials/${materialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedMaterial = await response.json();
        const updatedMaterials = [...materials];
        updatedMaterials[editIndex] = updatedMaterial;
        setMaterials(updatedMaterials);
        setEditIndex(-1); // Exit edit mode
        setEditFormData({ // Reset the form data
          packagingMaterial: '',
          internalMeasurement: '',
          weightLimit: '',
          description: '',
          features: '',
          uploadImage: '',
        });
      } else {
        console.error('Failed to save material');
      }
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  // Delete a row
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/packaging-materials/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id));
      } else {
        console.error('Failed to delete material');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  // Filter materials based on search query
  const filteredMaterials = materials.filter((material) =>
    material.packagingMaterial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LayoutNew>
      <div className="table-container">
      
      <h2>Packaging Materials</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by material name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <button onClick={handlePrintClick} className="print-btn">
        Print Doc
      </button>

      <div id="printableTable">
        <table className="packaging-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Material</th>
              <th>Internal Measurements</th>
              <th>Weight Limit</th>
              <th>Description</th>
              <th>Features</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material, index) => (
              <tr key={material._id}>
                {editIndex === index ? (
                  <>
                    <td>{material._id}</td>
                    <td>
                      <input
                        type="text"
                        name="packagingMaterial"
                        value={editFormData.packagingMaterial}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="internalMeasurement"
                        value={editFormData.internalMeasurement}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="weightLimit"
                        value={editFormData.weightLimit}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="features"
                        value={editFormData.features}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="uploadImage"
                        value={editFormData.uploadImage}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td className="actions-col"> {/* Add actions-col class */}
                      <button onClick={handleSaveClick} className="save-btn">
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{material._id}</td>
                    <td>{material.packagingMaterial}</td>
                    <td>{material.internalMeasurement}</td>
                    <td>{material.weightLimit}</td>
                    <td>{material.description}</td>
                    <td>{material.features.join(', ')}</td>
                    <td>{material.uploadImage}</td>
                    <td className="actions-col">
                      <button onClick={() => handleEditClick(index)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(material._id)} className="delete-btn">
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

export default Materials;
