import React, { useEffect, useState } from 'react';
import './package.css';

const PackagingMaterials = () => {
  const [materials, setMaterials] = useState([]);

  // Fetch data from the API
  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/packaging-materials');
      const data = await response.json();
      setMaterials(data); // Update the state with fetched materials
    } catch (error) {
      console.error("Error fetching packaging materials:", error);
    }
  };

  
  // Fetch data on component mount
  useEffect(() => {
    fetchMaterials();
  }, []);


  
  return (
    <div className="packaging-cards">
      {materials.length === 0 ? (
        <p>Loading packaging materials...</p>  // Display while data is loading
      ) : (
        materials.map(material => (
          <div key={material.id} className="card">
            <img src={material.uploadImage} alt={material.name} className="material-image" />
            <h3>{material.packagingMaterial}</h3>
            <p><strong>Internal measurements:</strong> {material.internalMeasurement}</p>
            <p><strong>Weight limit:</strong> {material.weightLimit}g</p>
            {material.description && <p>{material.description}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default PackagingMaterials;

