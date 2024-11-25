import React from 'react';
import { Card as AntCard, Row, Col, Button as AntButton, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Input } from 'antd';

const CardsContainer = styled.div`
  width: auto; /* Set this to the desired width (e.g., 100%, 80%, etc.) */
  overflow-y: auto; /* Enable vertical scrolling */
  flex-grow: 1; /* Allow cards to take the remaining space */
  max-height: 80vh; /* Set a max height for the scrollable area */
`;

const StyledCard = styled(AntCard)`
  background-color: #F3EEEA;
  height: 210px; /* Fixed height for each card */
  width: auto; /* Full width of the column */

  .ant-card-body {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensures footer is at the bottom */
    text-align: left; /* Aligns text to the left */
    margin-left: 25px;
    height: 100%; /* Allow footer to be positioned correctly */
  }
`;

const AddressList = ({ items, onEdit, onDelete, selectedCardId, setSelectedCardId, searchKey, setSearchKey }) => {
  
  // Filter items based on the search key
  const filteredItems = items.filter(item =>
    item && item.emaill && item. fnamee.toLowerCase().includes(searchKey.toLowerCase()) // Assuming `address` is the property to search
  );

  return (
    <CardsContainer>

      <Input
        placeholder="Search addresses..."
        prefix={<SearchOutlined />}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)} // Update search key
        style={{ marginRight: '8px', marginBottom: '10px' }}
      />

      <Row gutter={[16, 16]}>
        {filteredItems.map((item) => ( // Use filteredItems here
          <Col key={item._id} xs={24}>
            <StyledCard hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Checkbox
                  checked={selectedCardId === item._id}
                  onChange={() => setSelectedCardId(item._id)}
                  style={{ transform: 'scale(1.5)', marginRight: '10px' }} // Increase size and add spacing
                />
                <span style={{ fontWeight: 'bold' }}>{item.emaill}</span>
                <AntButton
                  type="primary"
                  style={{ marginRight: '20px', backgroundColor: 'white', color: 'black' }}
                  onClick={() => onEdit(item)}
                >
                  <EditOutlined />
                </AntButton>
              </div>
              <AntCard.Meta
                description={
                  <div>
                    <div>Name: {item.fnamee} {item.lnamee}</div>
                    <div>Address: {item.address}</div>
                    <div>Phone: {item.p_nbb}</div>
                    <div>Zip Code: {item.zipcode}</div>
                  </div>
                }
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <AntButton
                  danger
                  type="primary"
                  onClick={() => onDelete(item._id)}
                  style={{ color: 'white', marginRight: '20px' }}
                >
                  <DeleteOutlined /> Delete
                </AntButton>
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </CardsContainer>
  );
};

export default AddressList;
