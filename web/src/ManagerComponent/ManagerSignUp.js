import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Cascader, Button, message, Form, Input, Steps, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Delivery', '4'),
    
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];


// Residences data for the form
const residences = [


  // ... (same as before)

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const DeliveryDetails = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { confirm, ...formData } = values;

    try {
      console.log('Entered details:', formData);
      const response = await axios.post('http://localhost:8020/api/managers/add_manager', formData);
      console.log('Form data saved:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error saving form data:', error.response ? error.response.data : error.message);
      message.error('Submit failed. Please try again.');
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      {/* Steps Component */}
      <Steps
        size="small"
        current={1}
        items={[
          {
            title: 'Login',
          },
          {
            title: 'Delivery',
          },
          {
            title: 'Payment',
          },
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Form */}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstname"
          label="First Name"
          rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your Last Name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[{ type: 'array', required: true, message: 'Please select your habitual residence!' }]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^\d{10}$/, 
              message: 'Phone number must start with +94 and be followed by exactly 10 digits!'
            }
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="zipcode"
          label="Zip Code"
          rules={[
            { required: true, message: 'Please input your Zip Code!' },
            {
              pattern: /^\d{5}$/, 
              message: 'Zip Code must be exactly 5 digits!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Delivery details</Breadcrumb.Item>
          </Breadcrumb>

          {/* Delivery Details Form Content */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <DeliveryDetails />
          </div>
        </Content>

 
    

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
