import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LayoutNew from '../Layout';
import { Layout} from "antd";

import { useReactToPrint } from 'react-to-print';
function DiliveryDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey, setsearchkey] = useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:3000/api/managers/managers');
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:3000/api/managers/manager_delete/' + id);
        if (data.data.success) {
            getfetchdata();
            alert('Item deleted Successfully!');
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => {
            setIsGeneratingPDF(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsGeneratingPDF(false);
            alert('Data saved in PDF');
        }
    });

    const handlesearch = () => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer && customer.username && customer.username.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    // Inline CSS for styling
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    };

    const searchInputStyle = {
        padding: '10px',
        width: '200px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid #ccc',
    };

    const searchButtonStyle = {
        padding: '10px 15px',
        backgroundColor: '#1E2A5E',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };

    const headerStyle = {
        backgroundColor: '#1E2A5E',
        color: 'white',
    };

    const actionButtonStyle = {
        marginLeft: '10px',
        padding: '5px 10px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <LayoutNew>
            <Layout>
        <div style={containerStyle}>
            <div className="searchbtn">
                <input
                    type="search"
                    onChange={(e) => setsearchkey(e.target.value)}
                    placeholder='Customer Name'
                    style={searchInputStyle}
                />
                <button
                    id='search-btn'
                    onClick={(e) => handlesearch(e)}
                    style={searchButtonStyle}
                >
                    Search
                </button>
            </div>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <h2>Delivery's List</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerStyle}>
                            <th style={thTdStyle}>Customer Name</th>
                            <th style={thTdStyle}>Delivery Address</th>
                            <th style={thTdStyle}>Delivery Date</th>
                            <th style={thTdStyle}>Delivery Status</th>
                            <th style={thTdStyle}>Delivery Method</th>
                            <th style={thTdStyle}>Delivery Cost</th>
                            <th style={thTdStyle}>Assigned Personal</th>
                            <th style={thTdStyle}>Notes</th>
                            {!isGeneratingPDF && <th style={thTdStyle}>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td style={thTdStyle}>{e1.username}</td>
                                <td style={thTdStyle}>{e1.dili_address}</td>
                                <td style={thTdStyle}>{e1.dili_date}</td>
                                <td style={thTdStyle}>{e1.dili_status}</td>
                                <td style={thTdStyle}>{e1.dili_method}</td>
                                <td style={thTdStyle}>{e1.dili_cost}</td>
                                <td style={thTdStyle}>{e1.assignes_personal}</td>
                                <td style={thTdStyle}>{e1.notes}</td>
                                {!isGeneratingPDF && (
                                    <td style={thTdStyle}>
                                        <Link to={`/mdet/${e1._id}`} style={actionButtonStyle}>
                                            Edit
                                        </Link>
                                        <button onClick={() => handledelete(e1._id)} style={actionButtonStyle}>
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF} style={searchButtonStyle}>Generate Report</button>
        </div>
        </Layout>
        </LayoutNew>
    );
}

export default DiliveryDetails;
