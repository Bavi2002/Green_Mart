import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { v4 as uuidv4 } from "uuid";
import profileImage from "../Components/assets/avvatsr.png"; // Adjust the path accordingly

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNo: "",
  });
  const [addressBook, setAddressBook] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchOrder, setSearchOrder] = useState("");
  const email = location.state?.user.email;

  useEffect(() => {
    console.log("Location state:", location.state);
    if (email) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${email}`
          );
          console.log(response.data);
          setUserData(response.data);
          setFormData({
            name: response.data.name,
            address: response.data.address,
            contactNo: response.data.contactNo,
          });
          setAddressBook(response.data.addresses || []);
        } catch (err) {
          console.log("error:",err)
          setError("Failed to fetch user data.");
        }
      };

      fetchUserData();
    } else {
      setError("No email provided.");
    }
  }, [email]);

  const handleUpdate = async () => {
    try {
      if (!formData.address.trim()) {
        setError("Address cannot be empty.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/user/${email}`,
        formData
      );
      setUserData(response.data);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update user data.");
    }
  };

  // Import uuid for unique IDs

  const handleAddAddress = () => {
    if (!newAddress.trim()) {
      setError("Address cannot be empty.");
      return;
    }

    const newAddressItem = {
      id: uuidv4(), // Generate a unique ID
      address: newAddress,
    };

    setAddressBook((prevAddressBook) => [...prevAddressBook, newAddressItem]);
    setNewAddress("");
    // Clear the input after adding
    setError("");
  };

  const handleDeleteAddress = (id) => {
    setAddressBook((prevAddressBook) =>
      prevAddressBook.filter((item) => item.id !== id)
    );
  };
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? ")) {
      try {
        await axios.delete(`http://localhost:3000/api/user/${email}`);
        navigate("/login");
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout"
      );
      if (response.status === 200) {
        // Clear any stored authentication tokens if applicable
        localStorage.removeItem("token"); // If you store a token in localStorage
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for name
    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]*$/; // Allow only letters and spaces
      if (!nameRegex.test(value)) {
        setError("Name should not contain numbers or special characters.");
        return;
      } else {
        setError("");
      }
    }

    // Validation for contact number
    if (name === "contactNo") {
      const phoneRegex = /^[0-9]{10}$/; // Allow only 10 digits
      if (!phoneRegex.test(value)) {
        setError(
          "Contact number must be 10 digits and cannot contain letters."
        );
        return;
      } else {
        setError("");
      }
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        <h2>User Profile</h2>
        <img src={profileImage} alt="User Profile" className="profile-image" />
        {error && <p className="error-message">{error}</p>}
        {userData ? (
          <div className="parallel">
            {editMode ? (
              <div className="edit-form">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  className="profile-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onFocus={() => setError("")}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  className="profile-input"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                <label htmlFor="contactNo">Contact Number:</label>
                <input
                  id="contactNo"
                  className="profile-input"
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onFocus={() => setError("")}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                />
                <button className="profile-button" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button
                  className="profile-button cancel"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address}
                </p>
                <p>
                  <strong>Contact Number:</strong> {userData.contactNo}
                </p>
                <div class="profile-buttons">
                  <button
                    class="profile-button edit"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  <button
                    class="profile-button delete"
                    onClick={handleDeleteAccount}
                  >
                    Delete
                  </button>
                  <button class="profile-button logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          !error && <p>Loading user data...</p>
        )}
      </div>

      <div className="profile-right">
        <div className="address-book">
          <h3>Address Book</h3>
          {addressBook.length > 0 ? (
            addressBook.map((item) => (
              <div className="address-item" key={item.id}>
                <div className="address-content">
                  <input
                    type="radio"
                    name="address"
                    value={item.id}
                    onChange={(e) => setNewAddress(e.target.value)}
                    onFocus={() => setError("")}
                    checked={selectedAddress === item.id}
                  />
                  <label>{item.address}</label>
                </div>
                <button
                  className="delete-address-btn"
                  onClick={() => handleDeleteAddress(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No addresses added yet.</p>
          )}
          <div className="add-address-section">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              className="add-address-input"
            />
            <button className="add-address-btn" onClick={handleAddAddress}>
              ADD +
            </button>
          </div>
        </div>

        <div className="order-history">
          <h3>Order History</h3>
          <div className="order-search-bar">
            <input
              type="text"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              placeholder="Search for order history"
            />
            <button className="order-search-btn">Search</button>
          </div>
          <div className="recent-orders">
            <h4>Recent</h4>
            <div className="order-item">
              <p>Palm Jaggery</p>
              <span>Rs. 850</span>
            </div>
            <div className="order-item">
              <p>Cashew Nuts</p>
              <span>Rs. 1350</span>
            </div>
            <div className="order-item">
              <p>Dry Fish</p>
              <span>Rs. 1050</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
