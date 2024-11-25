


import React from "react";
import { Form, Row, Col, Input, Button, Cascader, Select } from "antd";

const residences = [
  {
    value: 'central',
    label: 'Central',
    children: [
      { value: 'kandy', label: 'Kandy' },
      { value: 'matale', label: 'Matale' },
      { value: 'nuwaraEliya', label: 'Nuwara Eliya' }
    ],
  },
  {
    value: 'eastern',
    label: 'Eastern',
    children: [
      { value: 'batticaloa', label: 'Batticaloa' },
      { value: 'ampara', label: 'Ampara' },
      { value: 'trincomalee', label: 'Trincomalee' }
    ],
  },
  {
    value: 'northern',
    label: 'Northern',
    children: [
      { value: 'jaffna', label: 'Jaffna' },
      { value: 'kilinochchi', label: 'Kilinochchi' },
      { value: 'mannar', label: 'Mannar' },
      { value: 'mullaitivu', label: 'Mullaitivu' },
      { value: 'vavuniya', label: 'Vavuniya' }
    ],
  },
  {
    value: 'northCentral',
    label: 'North Central',
    children: [
      { value: 'anuradhapura', label: 'Anuradhapura' },
      { value: 'polonnaruwa', label: 'Polonnaruwa' }
    ],
  },
  {
    value: 'northWestern',
    label: 'North Western',
    children: [
      { value: 'kurunegala', label: 'Kurunegala' },
      { value: 'puttalam', label: 'Puttalam' }
    ],
  },
  {
    value: 'sabaragamuwa',
    label: 'Sabaragamuwa',
    children: [
      { value: 'ratnapura', label: 'Ratnapura' },
      { value: 'kegalle', label: 'Kegalle' }
    ],
  },
  {
    value: 'southern',
    label: 'Southern',
    children: [
      { value: 'galle', label: 'Galle' },
      { value: 'matara', label: 'Matara' },
      { value: 'hambantota', label: 'Hambantota' }
    ],
  },
  {
    value: 'uva',
    label: 'Uva',
    children: [
      { value: 'badulla', label: 'Badulla' },
      { value: 'moneragala', label: 'Moneragala' }
    ],
  },
  {
    value: 'western',
    label: 'Western',
    children: [
      { value: 'colombo', label: 'Colombo' },
      { value: 'gampaha', label: 'Gampaha' },
      { value: 'kalutara', label: 'Kalutara' }
    ],
  }
];
const DeliveryPersonForm = ({ form, onFinish }) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contact_number"
            label="Contact Number"
            rules={[
              { required: true, message: "Please input the contact number!" },
              {
                pattern: /^0[0-9]{9}$/,
                message: "Please enter a valid 10-digit phone number starting with 0!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vehicle_type"
            label="Vehicle Type"
            rules={[{ required: true, message: "Please input the vehicle type!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vehicle_number"
            label="Vehicle Number"
            rules={[{ required: true, message: "Please input the vehicle number!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="assigned_area"
            label="Assigned Area"
            rules={[{ required: true, message: 'Please select your assigned area!' }]}
          >
            <Cascader options={residences} placeholder="Select Assigned Area" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="current_status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select Status">
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Unavailable">Unavailable</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
  );
};

export default DeliveryPersonForm;
