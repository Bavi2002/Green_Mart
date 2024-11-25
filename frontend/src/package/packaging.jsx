import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PackagingMaterials from './packagingMaterials';
import pattern1 from '../Components/assets/pattern1.png';
import pattern2 from '../Components/assets/pattern2.png';
import pattern3 from '../Components/assets/pattern3.jpg';
import pattern4 from '../Components/assets/pattern4.png';
import arrow from '../Components/assets/1.png';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../cart/CartContext';

const Packaging = () => {
    const { cartItems } = useContext(CartContext); // Accessing cart items from CartContext
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Use cart items as products
        if (cartItems && cartItems.length > 0) {
            console.log("Cart items:", cartItems);
            setProducts(cartItems);
        }
    }, [cartItems]);

    const getImageUrl = (imageName) => {
        // Construct the URL for the image based on how your server serves them
        return `http://localhost:3000/images/${imageName}`; // Adjust the URL according to your setup
    };

    const handlePackagingOptionChange = (productId, option) => {
        console.log("Changing packaging option for product ID:", productId, "to:", option); // Log the product ID
        const updatedProducts = products.map(product =>
            product._id === productId ? { ...product, packagingOption: option } : product
        );
        setProducts(updatedProducts);
    };

    const handleCustomColorChange = (productId, color) => {
        const updatedProducts = products.map(product =>
            product._id === productId ? { ...product, customColor: color } : product
        );
        setProducts(updatedProducts);
    };

    const handlePatternChange = (productId, pattern) => {
        const updatedProducts = products.map(product =>
            product._id === productId ? { ...product, selectedPattern: pattern } : product
        );
        setProducts(updatedProducts);
    };

    const handleNoteChange = (productId, note) => {
        const updatedProducts = products.map(product =>
            product._id === productId ? { ...product, note } : product
        );
        setProducts(updatedProducts);
    };

    const getPatternImage = (pattern) => {
        switch (pattern) {
            case 'pattern1':
                return pattern1;
            case 'pattern2':
                return pattern2;
            case 'pattern3':
                return pattern3;
            case 'pattern4':
                return pattern4;
            default:
                return '';
        }
    };

    const handleSubmit = async (product) => {
        const orderData = {
            pa_id: new Date().getTime().toString(),
            o_id: new Date().getTime().toString(),  // Order ID
            pro_id: product._id,                     // Product ID (changed from id to _id)
            quantity: product.quantity,
            material: product.packagingOption,
            internalMeasurement: product.internalMeasurement,
            customColor: product.customColor,
            customNote: product.note,
            pattern: product.selectedPattern,
            deliverDate: new Date(),
            status: 'Pending'
        };

        try {
            // Send order data to the backend
            const response = await axios.post('http://localhost:3000/api/packing-orders', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert('Packaging order added successfully!');
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to add packaging order');
        }
    };

    return (
        <div>
            <div>
                <button 
                    className="submitpack" 
                    style={{ marginRight: '2700px', marginLeft: '10px', width: '100px' }}
                    onClick={() => navigate('/checkout')} // Adjust the path as needed
                >
                    back
                </button>
            </div>

            <div className="packaging">
                {products.map(product => (
                    <div key={product._id} className="productpack">
                        <img src={getImageUrl(product.image)} alt={product.name} className="productpack-image" />
                        <div className="productpack-details">
                            <h3>{product.name}</h3>
                            <p>Weight = {product.weight}</p>
                            <p>Quantity = {product.quantity}</p>

                            {/* Display Custom Color and Pattern Overlapping */}
                            <p className='view'>CustomWrap:
                                <span className="custom-wrap">
                                    {/* Colored background */}
                                    <span
                                        className="color-background"
                                        style={{
                                            backgroundColor: product.customColor,
                                        }}
                                    ></span>

                                    {/* Pattern overlay */}
                                    {product.selectedPattern && (
                                        <img
                                            src={getPatternImage(product.selectedPattern)}
                                            alt={`Pattern ${product.selectedPattern}`}
                                            className="pattern-overlay"
                                        />
                                    )}
                                </span>
                            </p>
                        </div>

                        <div className="selection">
                            <label>Packaging Option</label>
                            <select
                                value={product.packagingOption}
                                onChange={(e) => handlePackagingOptionChange(product._id, e.target.value)} // Changed from product.id to product._id
                            >
                                <option value="Kraft Paper Box">Kraft Paper Box</option>
                                <option value="Square Bottom Paper Bag">Square Bottom Paper Bag</option>
                                <option value="Top Visible Corrugated Box">Top Visible Corrugated Box</option>
                                <option value="Cylindrical Paper Tube Box">Cylindrical Paper Tube Box</option>
                                <option value="Card Board Box">Card Board Box</option>
                            </select>

                            <div className="note-section">
                                <label>Note To Add In The Package</label>
                                <input
                                    type="text"
                                    placeholder="Note"
                                    value={product.note}
                                    onChange={(e) => handleNoteChange(product._id, e.target.value)} // Changed from product.id to product._id
                                />
                            </div>
                        </div>

                        <div className="button-group">
                            <label>Custom Color</label>
                            <input
                                className='colorbox'
                                type="color"
                                value={product.customColor}
                                onChange={(e) => handleCustomColorChange(product._id, e.target.value)} // Changed from product.id to product._id
                            />

                            <div className="pattern-options">
                                <label>Select Pattern</label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`pattern-${product._id}`} // Changed from product.id to product._id
                                        value="pattern1"
                                        checked={product.selectedPattern === 'pattern1'}
                                        onChange={() => handlePatternChange(product._id, 'pattern1')} // Changed from product.id to product._id
                                    />
                                    <img src={pattern1} alt="Pattern 1" id="pattern-image" />
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`pattern-${product._id}`} // Changed from product.id to product._id
                                        value="pattern2"
                                        checked={product.selectedPattern === 'pattern2'}
                                        onChange={() => handlePatternChange(product._id, 'pattern2')} // Changed from product.id to product._id
                                    />
                                    <img src={pattern2} alt="Pattern 2" id="pattern-image" />
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`pattern-${product._id}`} // Changed from product.id to product._id
                                        value="pattern3"
                                        checked={product.selectedPattern === 'pattern3'}
                                        onChange={() => handlePatternChange(product._id, 'pattern3')} // Changed from product.id to product._id
                                    />
                                    <img src={pattern3} alt="Pattern 3" id="pattern-image" />
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`pattern-${product._id}`} // Changed from product.id to product._id
                                        value="pattern4"
                                        checked={product.selectedPattern === 'pattern4'}
                                        onChange={() => handlePatternChange(product._id, 'pattern4')} // Changed from product.id to product._id
                                    />
                                    <img src={pattern4} alt="Pattern 4" id="pattern-image" />
                                </label>
                            </div>
                            <button className='submitpack' onClick={() => handleSubmit(product)}>Submit</button>
                        </div>
                    </div>
                ))}
            </div>
            <button 
    className="submitpack" 
    style={{ display: 'block', margin: '0 auto 50px', width: '240px' }} // Use margin auto for centering
    onClick={() => navigate('/start')} // Adjust the path as needed
>
    Proceed
</button>
            <div>
                <PackagingMaterials />
            </div>
        </div>
    );
};

export default Packaging;
