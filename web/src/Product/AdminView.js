import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import UpdateProductPopup from './UpdateProductPopup ';
import { Link } from "react-router-dom";

import LayoutNew from "../Layout";

const AdminView = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:3000/api/products/getImages');
            setProducts(res.data);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            axios.delete(`http://localhost:3000/api/products/delete/${id}`)
                .then(() => {
                    fetchProducts(); // Refresh the product list
                })
                .catch(err => setError('Failed to delete product'));
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true); // Open the popup
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        
        doc.autoTable({
            head: [['Product Name', 'Category', 'Quantity', 'Expiry Date']],
            body: products.map(product => [
                product.name,
                product.category,
                product.quantity,
                formatDate(product.expDate)
            ]),
        });
    
        doc.save('products-report.pdf');
    };
    

    const Header = () => {
        return (
            <div className="bg-green-800 text-white p-4 flex justify-center items-center shadow-md">
                <div className="flex space-x-6">
                    <Link to='/viewproduct' className="hover:text-green-300 transition-colors duration-300">Home</Link>
                    <Link to='/addproduct' className="hover:text-green-300 transition-colors duration-300">Add Product</Link>
                    <Link to='/adminproduct' className="hover:text-green-300 transition-colors duration-300">Manage Product</Link>
                    <Link to='/dashboard' className="hover:text-green-300 transition-colors duration-300">Dashboard</Link>
                </div>
            </div>
        );
    };

    return (
        <LayoutNew>

        <div>
                   
        <div>
            <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-green-800">Admin View</h2>
                    <div className="flex space-x-4">
                        <a 
                            href="/addproduct" 
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Add Product
                        </a>
                        <button 
                            onClick={generatePDF}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            Export PDF
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-600 text-center">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table id="product-table" className="min-w-full text-left text-sm text-gray-500">
                            <thead className="bg-green-100 text-gray-700">
                                <tr>
                                    <th className="py-3 px-6 border-b">Image</th>
                                    <th className="py-3 px-6 border-b">Name</th>
                                    <th className="py-3 px-6 border-b">Category</th>
                                    <th className="py-3 px-6 border-b">Price</th>
                                    <th className="py-3 px-6 border-b">Discount</th>
                                    <th className="py-3 px-6 border-b">Quantity</th>
                                    <th className="py-3 px-6 border-b">Manufacture Date</th>
                                    <th className="py-3 px-6 border-b">Expiry Date</th>
                                    <th className="py-3 px-6 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {products.map(product => (
                                    <tr key={product._id} className="border-b hover:bg-green-50 transition duration-200">
                                        <td className="py-4 px-6">
                                            <img 
                                                src={`http://localhost:3000/Images/${product.image}`} 
                                                alt={product.name} 
                                                className="w-20 h-20 object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                                        <td className="py-4 px-6">{product.category}</td>
                                        <td className="py-4 px-6 text-gray-700">
                                            {product.discount ? (
                                                <>
                                                    <span className="text-gray-900">Rs.{product.price}</span>
                                                    {/* <span className="ml-2 font-bold text-green-600">
                                                        ${((1 - product.discount / 100) * product.price).toFixed(2)}
                                                    </span> */}
                                                </>
                                            ) : (
                                                <span className="text-green-600">${product.price}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">{product.discount}%</td>
                                        <td className="py-4 px-6">{product.quantity}</td>
                                        <td className="py-4 px-6">{formatDate(product.manufactureDate)}</td>
                                        <td className="py-4 px-6">{formatDate(product.expDate)}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-4">
                                                <button 
                                                    onClick={() => handleUpdate(product)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(product._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Update Product Popup */}
            {isPopupOpen && (
                <UpdateProductPopup 
                    product={selectedProduct} 
                    onClose={() => setIsPopupOpen(false)} 
                    onUpdate={fetchProducts}
                />
            )}
        </div>
        </div>
        </LayoutNew>

    );
};

export default AdminView;
