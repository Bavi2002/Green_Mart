import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import customerservice from '../Components/assets/customer-service.jpg';
import chat from '../Components/assets/chat-with-us.png';

const ComplainForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phoneNumber: '',
        complaintCategory: 'service',
        orderId: '',
        complaintDetails: '',
        dateOfIncident: '',
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

    const handleReturn = () => {
        navigate('/return');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.customerName) newErrors.customerName = 'Customer name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must contain only numbers.';
        }
        if (!formData.complaintDetails) newErrors.complaintDetails = 'Complaint details are required.';
        if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required.';
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
        formDataToSend.append('customerName', formData.customerName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('complaintCategory', formData.complaintCategory);
        formDataToSend.append('orderId', formData.orderId);
        formDataToSend.append('complaintDetails', formData.complaintDetails);
        formDataToSend.append('dateOfIncident', formData.dateOfIncident);

        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/complaints', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Complaint submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error("Error submitting complaint:", error);
            if (error.response) {
                setErrors({ api: error.response.data.message || 'Failed to submit the complaint. Please try again later.' });
            } else {
                setErrors({ api: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <section style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '2rem' }}>Complaint Form</h1>
                <p>We're here to help! Please fill out this form to report any issues with your order or service.</p>
                <img src={chat} style={{ width: '150px', marginTop: '10px' }} alt='chat' />
            </section>
            <main>
            <div style={{ marginTop: '20px', textAlign: 'center', marginLeft:'300px' }}>
                        <img src={customerservice} style={{ width: '200px' }} alt="Customer Service" />
             </div>
                <div id="complaint-form" style={{ maxWidth: '600px', margin: 'auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>File a Complaint or leave a review</h2>
                        {errors.api && <div style={{ color: 'red' }}>{errors.api}</div>}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="customer-name">Customer Name:</label>
                            <input
                                type="text"
                                id="customer-name"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                            {errors.customerName && <div style={{ color: 'red' }}>{errors.customerName}</div>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="phone-number">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone-number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                            {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="complaint-category">Category:</label>
                            <select
                                id="complaint-category"
                                name="complaintCategory"
                                value={formData.complaintCategory}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            >
                                <option value="service">Service</option>
                                <option value="product">Product</option>
                                <option value="delivery">Delivery</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="order-id">Order ID (if applicable):</label>
                            <input
                                type="text"
                                id="order-id"
                                name="orderId"
                                value={formData.orderId}
                                onChange={handleChange}
                                style={{ padding: '8px', width: '100%' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="date-of-incident">Date of Incident:</label>
                            <input
                                type="date"
                                id="date-of-incident"
                                name="dateOfIncident"
                                value={formData.dateOfIncident}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%' }}
                            />
                            {errors.dateOfIncident && <div style={{ color: 'red' }}>{errors.dateOfIncident}</div>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="complaint-details">Description/details:</label>
                            <textarea
                                id="complaint-details"
                                name="complaintDetails"
                                value={formData.complaintDetails}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', width: '100%', height: '100px' }}
                            />
                            {errors.complaintDetails && <div style={{ color: 'red' }}>{errors.complaintDetails}</div>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="image">Upload Image (optional):</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ padding: '8px', width: '100%' }}
                            />
                            {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Submit Complaint</button>
                            <button type="button" style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }} onClick={handleReturn}>Return Product</button>
                        </div>
                    </form>
                    
                </div>

                <section style={{ marginTop: '40px' }}>
                    <div style={{ maxWidth: '600px', margin: 'auto' }}>
                        <h2>Frequently Asked Questions</h2>
                        <h3>How long do I have to submit a complaint?</h3>
                        <p>You have 30 days from the date of service or delivery to submit a complaint.</p>
                        <h3>Will I be notified once my complaint is resolved?</h3>
                        <p>Yes, you will receive an email notification once your complaint has been addressed.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ComplainForm;
