import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LayoutNew from '../Layout';
import { Layout, Modal, Progress, Steps, Form, Input, Button, Cascader } from "antd";

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

function Product() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ visible: false, message: '', isSuccess: false });
    const [order, setOrder] = useState({
        emaill: "",
        fnamee: "",
        lnamee: "",
        habitual_residence: "",
        address: "",
        p_nbb: "",
        zipcode: "",
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!order.emaill) {
            newErrors.emaill = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(order.emaill)) {
            newErrors.emaill = "Email address is invalid.";
        }

        if (!order.fnamee) newErrors.fnamee = "First name is required.";
        if (!order.lnamee) newErrors.lnamee = "Last name is required.";
        if (!order.habitual_residence) newErrors.habitual_residence = "Habitual residence is required.";
        if (!order.address) newErrors.address = "Address is required.";
        if (!order.p_nbb) {
            newErrors.p_nbb = "Phone number is required.";
        } else if (isNaN(order.p_nbb)) {
            newErrors.p_nbb = "Phone number must be numeric.";
        } else if (order.p_nbb.length < 10) {
            newErrors.p_nbb = "Phone number must be at least 10 digits long.";
        }

        if (!order.zipcode) {
            newErrors.zipcode = "Zip code is required.";
        } else if (isNaN(order.zipcode)) {
            newErrors.zipcode = "Zip code must be numeric.";
        } else if (order.zipcode.length < 5) {
            newErrors.zipcode = "Zip code must be at least 5 digits long.";
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/items/item_create", order);
            console.log(response.data);
            setModal({ visible: true, message: "Successfully added!", isSuccess: true });
            setOrder({
                emaill: "",
                fnamee: "",
                lnamee: "",
                habitual_residence: "",
                address: "",
                p_nbb: "",
                zipcode: "",
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the item:", error);
            setModal({ visible: true, message: "There was an error adding the item.", isSuccess: false });
        }
    };

    const handleModalOk = () => {
        setModal({ ...modal, visible: false });
        navigate("/itemdetails");
    };

    return (
  <div>
                <div style={{ width: '60%', margin: '0 auto', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                    <Steps
                        size="small"
                        current={1}
                        items={[{ title: 'Login' }, { title: 'Delivery' }, { title: 'Payment' }]}
                        style={{ marginBottom: '20px' }}
                    />
<Form
  form={form}
  name="register"
  layout="horizontal"  // Ensure form elements are aligned
  labelCol={{ span: 8 }}  // Label column width (controls label alignment)
  wrapperCol={{ span: 16 }}  // Input field column width
  onFinish={handleSubmit}
  style={{
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#EDE8DC',
    padding: '20px',
    borderRadius: '8px',
    color: '#333',
  }}
  scrollToFirstError
>
  <Form.Item
    name="emaill"
    label="E-mail"
    rules={[
      { type: 'email', message: 'The input is not valid E-mail!' },
      { required: true, message: 'Please input your E-mail!' }
    ]}
  >
    <Input name="emaill" value={order.emaill} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item
    name="fnamee"
    label="First Name"
    rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}
  >
    <Input name="fnamee" value={order.fnamee} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item
    name="lnamee"
    label="Last Name"
    rules={[{ required: true, message: 'Please input your Last Name!', whitespace: true }]}
  >
    <Input name="lnamee" value={order.lnamee} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item
    name="habitual_residence"
    label="Habitual Residence"
    rules={[{ required: true, message: 'Please select your habitual residence!' }]}
  >
    <Cascader options={residences} onChange={(value) => setOrder({ ...order, habitual_residence: value })} />
  </Form.Item>

  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: 'Please input your address!', whitespace: true }]}
  >
    <Input name="address" value={order.address} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item
    name="p_nbb"
    label="Phone Number"
    rules={[
      { required: true, message: 'Please input your phone number!' },
      { pattern: /^\d{10}$/, message: 'Phone number must be exactly 10 digits!' }
    ]}
  >
    <Input name="p_nbb" value={order.p_nbb} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item
    name="zipcode"
    label="Zip Code"
    rules={[
      { required: true, message: 'Please input your zip code!' },
      { pattern: /^\d{5}$/, message: 'Zip code must be at least 5 digits!' }
    ]}
  >
    <Input name="zipcode" value={order.zipcode} onChange={handleOnChange} />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>

                </div>
                <Modal
                    title={modal.isSuccess ? 'Success' : 'Error'}
                    open={modal.visible}

                    footer={null} // Remove default footer if you don't need it
                >
                    <div style={{ textAlign: 'center' }}>
                        <Progress
                            type="circle"
                            percent={modal.isSuccess ? 100 : 70}
                            status={modal.isSuccess ? 'success' : 'exception'}
                            style={{ marginBottom: '16px' }}
                        />
                        <p>{modal.message}</p>

                        <button
                onClick={handleModalOk}
                style={{
                    padding: '10px 20px',
                    margin: '0 10px',
                    backgroundColor: '#1E2A5E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                OK
            </button>

      
                    </div>
                </Modal>
                    </div>
    );
}

export default Product;
