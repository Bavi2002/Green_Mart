import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductPopup = ({ product, onClose, onUpdate }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [discount, setDiscount] = useState(product.discount || 0);
    const [category, setCategory] = useState(product.category || ''); // Ensure initial value
    const [expDate, setExpDate] = useState(product.expDate ? new Date(product.expDate).toISOString().substr(0, 10) : '');
    const [manufactureDate, setManufactureDate] = useState(product.manufactureDate ? new Date(product.manufactureDate).toISOString().substr(0, 10) : '');

    // Validation state
    const [errors, setErrors] = useState({});

    const handleSave = () => {
        // Validate form fields
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        let errors = {};

        if (!name.trim()) errors.name = "Product name is required";
        if (!description.trim()) errors.description = "Product description is required";
        if (!quantity || quantity <= 0) errors.quantity = "Quantity must be a positive number";
        if (!price || price <= 0) errors.price = "Price must be a positive number";
        if (isNaN(discount) || discount < 0 || discount > 100) errors.discount = "Discount must be a number between 0 and 100";
        if (expDate < today) errors.expDate = "Expiration date cannot be before the current date";
        if (expDate < manufactureDate) errors.expDate = "Expiration date cannot be before the manufacture date";
        if (manufactureDate > today) errors.manufactureDate = "Manufacture date cannot be after the current date";

        setErrors(errors);

        // Stop if there are errors
        if (Object.keys(errors).length > 0) return;

        // Proceed with update
        axios.put(`http://localhost:3000/api/products/update/${product._id}`, {
            name, description, quantity, price, discount, category, expDate, manufactureDate
        })
        .then(() => {
            onUpdate(); // Refresh the product list
            onClose(); // Close the popup
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">Update Product</h3>
                
                {/* Form Fields */}
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Product Name"
                />
                {errors.name && <p className="text-red-600 text-sm mb-2">{errors.name}</p>}

                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Description"
                />
                {errors.description && <p className="text-red-600 text-sm mb-2">{errors.description}</p>}

                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Price"
                />
                {errors.price && <p className="text-red-600 text-sm mb-2">{errors.price}</p>}

                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Quantity"
                />
                {errors.quantity && <p className="text-red-600 text-sm mb-2">{errors.quantity}</p>}

                <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Discount (%)"
                />
                {errors.discount && <p className="text-red-600 text-sm mb-2">{errors.discount}</p>}

                {/* Category Dropdown */}
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                >
                    <option value="">Select Category</option>
                    <option value="Dry Products">Dry Products</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Handmade Eatable">Handmade Eatable</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Snacks">Snacks</option>
                </select>
                {errors.category && <p className="text-red-600 text-sm mb-2">{errors.category}</p>}

                <input
                    type="date"
                    value={expDate}
                    onChange={e => setExpDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                />
                {errors.expDate && <p className="text-red-600 text-sm mb-2">{errors.expDate}</p>}

                <input
                    type="date"
                    value={manufactureDate}
                    onChange={e => setManufactureDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                />
                {errors.manufactureDate && <p className="text-red-600 text-sm mb-2">{errors.manufactureDate}</p>}

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <button 
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPopup;
