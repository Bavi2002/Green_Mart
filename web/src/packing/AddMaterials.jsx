import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './materials.css';
import addpackphoto from '../Components/assets/Sustainable-packaging.png';
import LayoutNew from "../Layout";


const AddMaterials = () => {
  const [formData, setFormData] = useState({
    packagingMaterial: '',
    internalMeasurement: '',
    weightLimit: '',
    description: '',
    features: [],  // Initialized as an empty array to store selected features
    uploadImage: null
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, name, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkboxes for features
      setFormData((prevData) => {
        let updatedFeatures = [...prevData.features];
        if (checked) {
          updatedFeatures.push(value);  // Add feature if checkbox is checked
        } else {
          updatedFeatures = updatedFeatures.filter((feature) => feature !== value);  // Remove feature if unchecked
        }
        return { ...prevData, features: updatedFeatures };
      });
    } else {
      // Handle other input fields
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, uploadImage: e.target.files[0] }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required Fields Validation
    if (!formData.packagingMaterial) {
      newErrors.packagingMaterial = 'Packaging material is required.';
    } else if (formData.packagingMaterial.length < 3) {
      newErrors.packagingMaterial = 'Packaging material should be at least 3 characters.';
    }

    if (!formData.internalMeasurement) {
      newErrors.internalMeasurement = 'Internal measurement is required.';
    }

    if (!formData.weightLimit) {
      newErrors.weightLimit = 'Weight limit is required.';
    } else if (isNaN(formData.weightLimit)) {
      newErrors.weightLimit = 'Weight limit should be a number.';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required.';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters.';
    }

    // File Validation
    if (formData.uploadImage) {
      const fileType = formData.uploadImage.type;
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(fileType)) {
        newErrors.uploadImage = 'Only JPG or PNG images are allowed.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append('packagingMaterial', formData.packagingMaterial);
      data.append('internalMeasurement', formData.internalMeasurement);
      data.append('weightLimit', formData.weightLimit);
      data.append('description', formData.description);
      data.append('features', formData.features.join(', ')); // Sending features as a comma-separated string

      if (formData.uploadImage) {
        data.append('uploadImage', formData.uploadImage);
      }

      try {
        const response = await axios.post('http://localhost:3000/api/packaging-materials', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Packaging material added successfully!');
        console.log('Response:', response.data);
        navigate('/Materials');
      } catch (error) {
        console.error('Error adding material:', error);
        alert('Failed to add material.');
      }
    }
  };

  return (
    <LayoutNew>
    
    <div className="form-container">
      <img src={addpackphoto} className='addpackphoto' alt='Packaging' />
      <div className="form-content">
        <div className="form-header">
          <h2>Add Packaging Materials</h2>
        </div>
        <form className="packaging-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="packagingMaterial">Packaging Material</label>
            <input
              type="text"
              id="packagingMaterial"
              value={formData.packagingMaterial}
              onChange={handleChange}
              placeholder="Packaging Material"
            />
            {errors.packagingMaterial && <p className="error">{errors.packagingMaterial}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="internalMeasurement">Internal Measurement</label>
            <input
              type="text"
              id="internalMeasurement"
              value={formData.internalMeasurement}
              onChange={handleChange}
              placeholder="Internal Measurement"
            />
            {errors.internalMeasurement && <p className="error">{errors.internalMeasurement}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="weightLimit">Weight Limit (In grams)</label>
            <input
              type="text"
              id="weightLimit"
              value={formData.weightLimit}
              onChange={handleChange}
              placeholder="Weight Limit"
            />
            {errors.weightLimit && <p className="error">{errors.weightLimit}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description about the packaging material"
            ></textarea>
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="features">Select Packaging Features</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Airproofed"
                  checked={formData.features.includes("Airproofed")}
                  onChange={handleChange}
                />
                Airproofed
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="NoLiquidOut"
                  checked={formData.features.includes("NoLiquidOut")}
                  onChange={handleChange}
                />
                No Liquid Out
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Biodegradable"
                  checked={formData.features.includes("Biodegradable")}
                  onChange={handleChange}
                />
                Biodegradable
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Waterproof"
                  checked={formData.features.includes("Waterproof")}
                  onChange={handleChange}
                />
                Waterproof
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Reusable"
                  checked={formData.features.includes("Reusable")}
                  onChange={handleChange}
                />
                Reusable
              </label>
              <div>
              </div>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Eco-friendly Ink"
                  checked={formData.features.includes("Eco-friendly Ink")}
                  onChange={handleChange}
                />
                Eco-friendly Ink
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Fragile Protection"
                  checked={formData.features.includes("Fragile Protection")}
                  onChange={handleChange}
                />
                Fragile Protection
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Lightweight"
                  checked={formData.features.includes("Lightweight")}
                  onChange={handleChange}
                />
                Lightweight
              </label>
              <label>
                <input
                  type="checkbox"
                  name="features"
                  value="Vacuum Sealed"
                  checked={formData.features.includes("Vacuum Sealed")}
                  onChange={handleChange}
                />
                Vacuum Sealed
              </label>
              </div>
              {errors.features && <p className="error">{errors.features}</p>}
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="uploadImage">Packaging Material Image</label>
            <input
              type="file"
              id="uploadImage"
              onChange={handleFileChange}
            />
            {errors.uploadImage && <p className="error">{errors.uploadImage}</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Add</button>
          </div>
        </form>
      </div>
    </div>
   
    </LayoutNew>
  );
};

export default AddMaterials;
