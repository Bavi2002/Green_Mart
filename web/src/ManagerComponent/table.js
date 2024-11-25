import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, message, Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ItemsTable = () => {
  const [showDiscounts, setShowDiscounts] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items/item');
      if (response.data.success) {
        setShowDiscounts(response.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Email", "First Name", "Last Name", "Habitual Residence", "Address", "Phone Number", "Zip Code"];
    
    const tableRows = showDiscounts.map(item => [
      item.emaill,
      item.fnamee,
      item.lnamee,
      item.habitual_residence.join(', '), // handle array as string
      item.address,
      item.p_nbb,
      item.zipcode
    ]);

    // Adding table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('items_table.pdf');
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'emaill',
      key: 'emaill',
    },
    {
      title: 'First Name',
      dataIndex: 'fnamee',
      key: 'fnamee',
    },
    {
      title: 'Last Name',
      dataIndex: 'lnamee',
      key: 'lnamee',
    },
    {
      title: 'Habitual Residence',
      dataIndex: 'habitual_residence',
      key: 'habitual_residence',
      render: (residences) => residences.join(', '),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'p_nbb',
      key: 'p_nbb',
    },
    {
      title: 'Zip Code',
      dataIndex: 'zipcode',
      key: 'zipcode',
    },
  ];

  return (
    <div>
      <h1>Items List</h1>
      <Button type="primary" onClick={exportPDF} style={{ marginBottom: 16 }}>
        Export to PDF
      </Button>
      <Table
        dataSource={showDiscounts}
        columns={columns}
        rowKey="_id" // assuming you have an _id field in your data
        pagination={false}
      />
    </div>
  );
};

export default ItemsTable;
