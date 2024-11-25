import React from "react";
import { Form, Row, Col, Input, Button } from "antd";

const EditItem = ({ form, onFinish }) => {
  const containerStyle = {
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#1E2A5E' }}>User</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          {/* Email Field with email validation */}
          <Col span={8}>
            <Form.Item
              name="emaill"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* First Name Field */}
          <Col span={8}>
            <Form.Item
              name="fnamee"
              label="First Name"
              rules={[
                { required: true, message: 'Please input your first name!' },
                { min: 2, message: 'First name must be at least 2 characters long' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Last Name Field */}
          <Col span={8}>
            <Form.Item
              name="lnamee"
              label="Last Name"
              rules={[
                { required: true, message: 'Please input your last name!' },
                { min: 2, message: 'Last name must be at least 2 characters long' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Address Field */}
          <Col span={8}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: 'Please input your address!' },
                { max: 100, message: 'Address cannot be longer than 100 characters' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Phone Number Field with pattern validation */}
          <Col span={8}>
            <Form.Item
              name="p_nbb"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Zip Code Field with validation */}
          <Col span={8}>
            <Form.Item
              name="zipcode"
              label="Zip Code"
              rules={[
                { required: true, message: 'Please input your zip code!' },
                { pattern: /^[0-9]{5}$/, message: 'Zip code must be 5 digits' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>


      </Form>
    </div>
  );
}

export default EditItem;
