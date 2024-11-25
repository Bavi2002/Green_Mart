import React, { useEffect, useState } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton, Input, message, Checkbox, Modal, Form, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LayoutNew from '../Layout';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import EditForm from './EditItem';
import AddressList from './Address';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = AntCard;

function ItemDetails() {
  const [showDiscounts, setShowDiscounts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal, discount, total, items } = location.state || {};
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);


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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/items/item_delete/${id}`);
      if (response.data.success) {
        getFetchData();
        message.success('Item deleted successfully!');
      }
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const filterData = (searchKey) => {
    const filteredData = showDiscounts.filter((item) =>
      item && item.emaill.toLowerCase().includes(searchKey.toLowerCase())
    );
    setShowDiscounts(filteredData);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/items/item_update`, {
        ...values,
        id: editingItem._id,
      });
      if (response.data.success) {
        message.success('Item updated successfully!');
        setIsModalVisible(false);
        getFetchData();
      }
    } catch (error) {
      message.error('Failed to update item');
    }
  };

  const handleNewModalOpen = () => {
    setIsNewModalVisible(true);
  };

  return (
    <div>
      <Space
        style={{
          background: '#001529',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop:'50px'
        }}
      >
        <Space>
          <StockOutlined style={{ fontSize: '24px', marginRight: '8px',marginTop:'15px'}} />
          <Title level={2} style={{ fontSize: '24px', marginTop: '8px', color: 'white' }}>
            Delivery Details
          </Title>
        </Space>
      </Space>

      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'center', // Center the button
        }}
      >
        <AntButton
          type="primary"
          style={{ color: 'white' }}
          onClick={handleNewModalOpen}
        >
          <EditOutlined /> Select the Delivery Addresss
        </AntButton>
      </div>

      <Container>
        <ContentContainer>
          <CardsContainer>
          
          {items && items.map(item => (
    <StyledCard key={item.name}>
        <ItemTitle>{item.name}</ItemTitle>
        <div style={{marginLeft:'500px'}}>
            <p>Qty: {item.quantity}</p>
            <p>Price: Rs {item.price}</p>
            <p>Total: Rs {item.total}</p>
        </div>
        {item.imageUrl && ( // Check if the image URL exists
      <img
        src={item.imageUrl}
        alt={item.name} // Use the item name as alt text
        style={{ width: '100%', height: 'auto', marginTop: '8px', borderRadius: '8px' }} // Adjust styling as needed
      />
    )}
    </StyledCard>
))}

          </CardsContainer>

          <RightBox>
      <h3 style={{ textAlign: 'center' }}>Order Summary</h3>
      {selectedItemDetails && (
        <div style={{marginLeft:'30px' }}>
          <p><strong>Selected Address:</strong> {selectedItemDetails.emaill}</p>
          <p>Name: {selectedItemDetails.fnamee} {selectedItemDetails.lnamee}</p>
          <p>Address: {selectedItemDetails.address}</p>
          <p>Phone: {selectedItemDetails.p_nbb}</p>
          <p>Zip Code: {selectedItemDetails.zipcode}</p>
        </div>
      )}

      <SummaryCard>
        <p style={{ textAlign: 'right' }}>Subtotal: ${subtotal}</p>
        <p style={{ textAlign: 'right' }}>Discount: ${discount?.toFixed(2)}</p>
        <div style={{ color: '#06D001', fontWeight: 'bold', textAlign: 'right' }}>
          <p>Total: ${total?.toFixed(2)}</p>
        </div>
        <SummaryFooter>
          <AntButton type="primary" style={{ width: '100%' }}  onClick={() => navigate('/package')} >
            Proceed
          </AntButton>
        </SummaryFooter>
      </SummaryCard>
    </RightBox>

        </ContentContainer>

        {/* Modal for Editing Item */}
        <Modal
          title="Edit Item"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <EditForm form={form} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <AntButton
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    handleUpdate(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}
            >
              Submit
            </AntButton>
          </div>
        </Modal>

        {/* New Modal */}
        <Modal
          title="New Modal"
          open={isNewModalVisible}
          onCancel={() => setIsNewModalVisible(false)}
          footer={null}
        >
          
          <AddressList
            items={showDiscounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            searchKey={searchKey} // Pass search key
            setSearchKey={setSearchKey} // Pass setter function
          />
          <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <AntButton 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => navigate('/home')} 
              style={{ marginBottom: '12px' }}
            >
              Add New Delivery Address
            </AntButton>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <AntButton onClick={() => setIsNewModalVisible(false)}>Close</AntButton>

          <AntButton 
  type="primary" 
  onClick={() => {
    const selectedItem = showDiscounts.find(item => item._id === selectedCardId);
    if (selectedItem) {
      setSelectedItemDetails(selectedItem);
    }
    setIsNewModalVisible(false);
  }}
>
  OK
</AntButton>

    
    </div>
          
        </Modal>
      </Container>
      </div>
    
  );
}

const Container = styled.div`
  padding: 10px;
  background-color: #CADABF;
  border-radius: 8px;
  margin-left: 20px;
  display: flex;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 20px;
  width: 500px;
`;

const CardsContainer = styled.div`
  width: auto;
  overflow-y: auto;
  flex-grow: 1;
  max-height: 80vh;
`;

const StyledCard = styled(AntCard)`
  background-color: #F3EEEA;
  height: 130px;
  width: auto;
  margin-bottom: 16px;
  display: flex;

  .ant-card-body {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    margin-left: 25px;
    height: 100%;
  }
`;

const CardHeader = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemDescription = styled.span`
  font-weight: normal; /* Normal weight for description */
  color: #555; /* Slightly lighter color for description */
  font-size: 14px; /* Adjust font size if needed */
  margin-left:0px;

  `;

const ItemTitle = styled.span`
  font-weight: bold;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;


const RightBox = styled.div`
  width: 550px;
  height: auto;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 15px;
  margin-right: 15px;
  position: relative; /* Allows absolute positioning of footer */
`;

const SummaryCard = styled(AntCard)`
  width: 100%;
  margin-top: 15px; /* Pushes the card to the bottom */
  padding: 0px;
  align-items: center;
  height:170px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export default ItemDetails;
