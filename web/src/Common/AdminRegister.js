import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminRegister = () => {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.trim() !== confirmPassword.trim()) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    role,
                    email,
                    password: password.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("Registration successful!");
                navigate("/admin-login");
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Registration failed:", error.message);
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

    const headingStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    };

    const formStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
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
        fontSize: '16px',
        width: '100%',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3', // Darker shade for hover effect
    };

    const redirectStyle = {
        marginTop: '20px',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Admin Registration</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for select
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="sales">Salesperson</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                        style={inputStyle} // Inline styling for input
                    />
                </div>
                <button type="submit" style={buttonStyle}>Register</button>
            </form>

            <div style={redirectStyle}>
                <p>Already have an account?</p>
                <button 
                    onClick={() => navigate('/admin-login')} 
                    style={buttonStyle} // Inline styling for button
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default AdminRegister;
