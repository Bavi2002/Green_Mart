import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from '../cart/CartContext'; // Import CartContext
import { Link } from "react-router-dom";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { cartItems, setCartItems } = useContext(CartContext); // Use context
    const [notification, setNotification] = useState(""); // State for notification

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/getImages')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleFilter = (product) => {
        return (selectedCategory === "All" || product.category === selectedCategory) &&
               product.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const calculateDiscountedPrice = (price, discount) => {
        return (price - (price * (discount / 100))).toFixed(2);
    };

    const addToCart = (product, quantity) => {
        console.log("Adding to cart:", product);
        const existingProduct = cartItems.find(item => item._id === product._id);
        if (existingProduct) {
            setCartItems(cartItems.map(item => 
                item._id === product._id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
        
        // Show notification
        setNotification("Item added");
        // Hide notification after 2 seconds
        setTimeout(() => {
            setNotification("");
        }, 2000);
    };

    return (
        <div>
            <div className="p-6">
                {/* Notification Message */}
                {notification && (
                    <div className="mb-4 p-3 bg-green-200 text-green-800 rounded-md">
                        {notification}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-green-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 mb-4 md:mb-0"
                    >
                        <option value="All">All Categories</option>
                        <option value="Dry Products">Dry Products</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/2 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.filter(handleFilter).map((product) => (
                        <div 
                            key={product._id} 
                            className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="h-40 flex justify-center items-center">
                                <img
                                    src={`http://localhost:3000/Images/${product.image}`}
                                    alt={product.name}
                                    className="object-contain h-full"
                                />
                            </div>

                            <h3 className="text-gray-800 text-lg font-semibold mt-4">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {product.category}
                            </p>

                            <div className="mt-2">
                                {product.discount > 0 ? (
                                    <>
                                        <span className="line-through text-gray-400 mr-2">Rs.{product.price.toFixed(2)}</span>
                                        <span className="text-green-600 font-bold text-lg">
                                            Rs.{calculateDiscountedPrice(product.price, product.discount)}
                                        </span>
                                        <span className="ml-2 text-red-500 font-semibold">
                                            (-{product.discount}%)
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-green-600 font-bold text-lg">Rs.{product.price.toFixed(2)}</span>
                                )}
                            </div>

                            <div className="flex items-center mt-4">
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    className="border w-12 p-2 rounded text-center"
                                    id={`quantity-${product._id}`}
                                />
                                <button
                                    className="ml-2 flex-1 bg-green-600 text-white px-4 py-2 rounded-md transform transition duration-300 hover:bg-green-700 hover:scale-105"
                                    onClick={() => addToCart(product, parseInt(document.getElementById(`quantity-${product._id}`).value))}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
