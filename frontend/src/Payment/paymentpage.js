import React, { useState, useEffect, useContext } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(CartContext);
  const navigate = useNavigate();
  const { cartItems, setCartItems } = context;
  const calculateDeliveryCharge = (subtotal) => {
    if (subtotal < 1000) return 300;
    if (subtotal <= 5000) return subtotal * 0.05;
    return subtotal * 0.07;
  };
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    // Any other data fetching or initialization can go here
    setLoading(false); // Set loading to false once data is fetched or initialized
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneRegex.test(formData.telephone)) {
      newErrors.telephone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subtotal = calculateTotal();
    const deliveryCharge = calculateDeliveryCharge(subtotal);
    const totalAmount = subtotal + 350 + deliveryCharge;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/submit-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod: "Not specified",
          packagingCharge: 350,
          deliveryCharge,
          totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment submission failed");
      }

      const { paymentId } = await response.json();
      setTimeout(() => {
        navigate(`/make-payment/${paymentId}`);
      }, 2000);
    } catch (error) {
      console.error("Error submitting payment:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
      return; // Prevent input if it contains numbers
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  if (loading && tableData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-green-600">Loading...</span>
      </div>
    );
  }

  const subtotal = calculateTotal();
  const packagingCharge = 350;
  const finalTotal = subtotal + packagingCharge; // Adjust this logic based on your needs

  return (
    <div className="bg-orange-50">
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg mt-8 shadow-md p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-green-700 hover:text-green-800"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold">Payment</h2>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                "firstName",
                "lastName",
                "email",
                "telephone",
                "address",
                "city",
              ].map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium mb-1 capitalize"
                  >
                    {field.split(/(?=[A-Z])/).join(" ")}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "telephone"
                        ? "tel"
                        : "text"
                    }
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-green-100 rounded-md"
                    required
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-2 text-left">Product Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">Rs. {item.price.toFixed(2)}</td>
                      <td className="p-2">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span>Sub-total</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Packaging</span>
                  <span>Rs. {packagingCharge.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-300 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs. {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <label className="flex items-center mb-4 md:mb-0">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-green-600"
                required
              />
              <span className="ml-2 text-sm text-gray-700">
                I have read and agree to the Terms & Conditions
              </span>
            </label>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </div>
              ) : (
                "Submit Payment"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
