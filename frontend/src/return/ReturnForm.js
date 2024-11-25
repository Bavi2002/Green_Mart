// src/ReturnProducts.js
import React, { useState } from 'react';
import axios from 'axios';
import './ReturnProducts.css';
import Returnconfirmation from './ReturnConfirmation'
import { useNavigate } from 'react-router-dom';

const ReturnProducts = () => {
    const [formData, setFormData] = useState({
        productName: '',
        orderId: '',
        email: '',
        address: '',
        reason: 'defective',
        deliveredDate: '',
        phoneNumber: '',
        image: null
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setErrors({ ...errors, image: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        console.log(formData); // Check form data for debugging
    
        if (!formData.productName) newErrors.productName = 'Product name is required.';
        if (!formData.orderId) newErrors.orderId = 'Order ID is required.';
        
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
    
        if (!formData.address) newErrors.address = 'Delivery address is required.';
    
        // Check if deliveredDate is provided and if it's in the past
        if (!formData.deliveredDate) {
            newErrors.deliveredDate = 'Delivered date is required.';
        } else {
            const currentDate = new Date();
            const deliveredDate = new Date(formData.deliveredDate);
    
            if (deliveredDate >= currentDate) {
                newErrors.deliveredDate = 'Delivered date must be in the past.';
            }
        }
    
        // Validate phone number is only digits and not empty
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must contain only numbers.';
        }
    
        if (!formData.image) newErrors.image = 'Image is required.';
    
        return newErrors;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('orderId', formData.orderId);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('reason', formData.reason);
        formDataToSend.append('deliveredDate', formData.deliveredDate);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        
        if (formData.image) {
            formDataToSend.append('image', formData.image); // Image file
        }


        try {
            const response = await axios.post('http://localhost:3000/api/returns', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('return Request added successfully!');
            console.log('Response:', response.data);
            navigate({Returnconfirmation})
        } catch (error) {
            console.error("Error submitting return request:", error);
            if (error.response) {
                setErrors({ api: error.response.data.message || 'Failed to submit return request. Please try again later.' });
            } else {
                setErrors({ api: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <div>
             <section id="return-instructions">
                    <h1 className='h1r'>Return Products</h1>
                    <p>If you are not completely satisfied with your purchase, you may return it within 5 days of delivery for a full refund. Please fill out the form below to initiate a return:</p>
                    <ol>
                        <li>Provide the details of your order and reason for return.</li>
                        <li>Wait for a confirmation email.</li>
                        <li>Return the product once you receive further instructions.</li>
                    </ol>
                </section>
            <main>
                <section id="return-form">
                    <center>
                        <h2 className='h2r'>Return Request Form</h2>
                        {errors.api && <div className="error">{errors.api}</div>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='label-return' htmlFor="product-name">Product Name:</label>
                                <input
                                    type="text"
                                    id="product-name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.productName && <div className="error">{errors.productName}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="order-id">Order ID:</label>
                                <input
                                    type="text"
                                    id="order-id"
                                    name="orderId"
                                    value={formData.orderId}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.orderId && <div className="error">{errors.orderId}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="address">Delivery Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.address && <div className="error">{errors.address}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="reason">Reason for Return:</label>
                                <select
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="defective">Defective Item</option>
                                    <option value="wrong-item">Wrong Item Shipped</option>
                                    <option value="not-as-described">Not as Described</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className='label-return' htmlFor="delivered-date">Delivered Date:</label>
                                <input
                                    type="date"
                                    id="delivered-date"
                                    name="deliveredDate"
                                    value={formData.deliveredDate}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.deliveredDate && <div className="error">{errors.deliveredDate}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="phone-number">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone-number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                            </div>
                            <div>
                                <label className='label-return' htmlFor="image">Upload Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.image && <div className="error">{errors.image}</div>}
                            </div>
                            <button type="submit" className='btn-submit'>Submit Return Request</button>
                        </form>
                    </center>
                </section>
                <div className='questions'>
                    <h2>  Frequently asked Questions</h2>
                    <h3>  How long do I have to return a product?</h3>
                    <p>  You have 30 days from the date of delivery to return a product</p>
                    <h3>  Do I have to pay for return shipping?</h3>
                    <p>  No,we provide a prepaid return shipping label for all eligible returns</p>
                    <h3>  How long does it take to process a refund?</h3>
                    <p>  Refunds are typically processed within 5-7 business days after the return is received</p>
                </div>
            </main>
        </div>
        
    );
};

export default ReturnProducts;
