import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutNew from '../Layout';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './admin.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [search, sort]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/users', {
                params: { search, sort },
            });
            console.log('Fetched users:', data); // Log the fetched data
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Admin Users Report", 14, 22);
        
        const tableColumn = ["Name", "Email", "Address", "Phone", "Created At"];
        const tableRows = [];

        users.forEach(user => {
            const userData = [
                user.name,
                user.email,
                user.address,
                user.contactNo,
                new Date(user.createdAt).toLocaleString(),
            ];
            tableRows.push(userData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save("admin_users_report.pdf");
    };

    return (
        <LayoutNew>
<div className='full'>
        <h1>Admin Panel</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setSort(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option value="">Sort</option>
                    <option value="asc">Sort by Name Ascending</option>
                    <option value="desc">Sort by Name Descending</option>
                    <option value="createdAtAsc">Sort by Created At Ascending</option>
                    <option value="createdAtDesc">Sort by Created At Descending</option>
                </select>
            </div>
            <button onClick={exportToPDF} className="export-button">Export to PDF</button> {/* Add class for styling */}
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.contactNo}</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </LayoutNew>
    );
};

export default UserTable;
