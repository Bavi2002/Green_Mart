import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create a navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('adminToken', data.token); // Store the JWT token
                alert('Login successful!');
                navigate('/user-details'); // Navigate to user details page upon successful login
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Inline CSS styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    };

    const formStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
    };

    const inputStyle = {
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '16px',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3', // Darker shade for hover effect
    };

    const lastDivStyle = {
        marginTop: '20px',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>Admin Login</h2> {/* Added heading */}
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <button type="submit" style={buttonStyle}>Login</button>
            </form>

            {/* Button to navigate to the registration page */}
            <div className='last' style={lastDivStyle}>
                <p>Don't have an account?</p>
                <button 
                    className="signup-button" 
                    onClick={() => navigate('/admin-register')}
                    style={buttonStyle} // Inline styling for button
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
