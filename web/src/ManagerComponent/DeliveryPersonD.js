import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Space,
  Button,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import LayoutNew from "../Layout";
import { DataGrid } from "@mui/x-data-grid";
import DeliveryPersonForm from "./AddEditDeliveryPerson";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Title } = Typography;
const { Content } = Layout;
const token = localStorage.getItem("authToken");

const DeliveryPersonManagementPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isAddDeliveryPersonModalVisible, setIsAddDeliveryPersonModalVisible] = useState(false);
  const [editingDeliveryPerson, setEditingDeliveryPerson] = useState(null);

  const fetchDeliveryPersons = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/delivery-person/get");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching delivery persons:", error);
    }
  };

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  const transformedRows = filteredData.map((row) => ({
    id: row._id,
    ...row,
  }));

  const filterData = () => {
    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, data]);

  const addNewDeliveryPerson = () => {
    setIsAddDeliveryPersonModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddDeliveryPersonModalVisible(false);
    setEditingDeliveryPerson(null);
    form.resetFields();
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this delivery person?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteItem(id),
    });
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delivery-person/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success) {
        message.success("Delivery person deleted successfully");
        fetchDeliveryPersons();
      }
    } catch (error) {
      message.error("Failed to delete delivery person");
    }
  };

  const handleEdit = (deliveryPerson) => {
    setEditingDeliveryPerson(deliveryPerson);
    setIsAddDeliveryPersonModalVisible(true);
    form.setFieldsValue({
      name: deliveryPerson.name,
      contact_number: deliveryPerson.contact_number,
      email: deliveryPerson.email,
      address: deliveryPerson.address,
      vehicle_type: deliveryPerson.vehicle_type,
      vehicle_number: deliveryPerson.vehicle_number,
      assigned_area: deliveryPerson.assigned_area,
      current_status: deliveryPerson.current_status,
    });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "contact_number", headerName: "Contact Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "vehicle_type", headerName: "Vehicle Type", width: 150 },
    { field: "vehicle_number", headerName: "Vehicle Number", width: 150 },
    { field: "assigned_area", headerName: "Assigned Area", width: 150 },
    { field: "current_status", headerName: "Status", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleEdit(params.row)}
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => confirmDelete(params.row._id)}
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    onFinishAddDeliveryPerson(values);
  };

  const onFinishAddDeliveryPerson = async (values) => {
    try {
      let response = null;
      if (editingDeliveryPerson) {
        response = await axios.put(
          "http://localhost:3000/api/delivery-person/update",
          { id: editingDeliveryPerson._id, ...values },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/delivery-person/create",
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      if (response.data.success) {
        form.resetFields();
        setIsAddDeliveryPersonModalVisible(false);
        const statusText = editingDeliveryPerson ? "updated" : "added";
        message.success(`Delivery person ${statusText} successfully`);
        fetchDeliveryPersons();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Contact Number",
      "Email",
      "Address",
      "Vehicle Type",
      "Vehicle Number",
      "Assigned Area",
      "Current Status",
    ];
    const tableRows = transformedRows.map(row => [
      row.name,
      row.contact_number,
      row.email,
      row.address,
      row.vehicle_type,
      row.vehicle_number,
      row.assigned_area,
      row.current_status,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Delivery Person Management", 14, 15);
    doc.save("delivery_persons.pdf");
  };

  return (
    <LayoutNew>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Space
            style={{
              background: "#001529",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Space>
              <StockOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <Title level={2} style={{ fontSize: "24px", marginTop: "8px", color: "white" }}>
                Delivery Person Management
              </Title>
            </Space>
            <Space>
              <Button
                type="primary"
                onClick={exportToPDF}
                style={{color:'white',backgroundColor:'white'}}
              >
                Export to PDF
              </Button>
            </Space>
          </Space>
          <br />
          <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={handleSearchInputChange}
              style={{ marginRight: "8px" }}
            />
            <div style={{ marginLeft: "auto", marginRight: "20px" }}>
  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={addNewDeliveryPerson}
    style={{
      color: 'white',
      backgroundColor: 'wheat',
      border: '1px solid black', // Add border color here
    }}
  >
    Add New Delivery Person
  </Button>
</div>

          </div>
          <DataGrid
            rows={transformedRows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
      <Modal
          open={isAddDeliveryPersonModalVisible}
          title={editingDeliveryPerson ? "Edit Delivery Person" : "Add New Delivery Person"}
          okText={editingDeliveryPerson ? "Update" : "Save"}
          cancelText="Cancel"
          onCancel={handleCancel}
          onOk={() => {
           form
          .validateFields()
          .then((values) => {
           onFinish(values);
           })
           .catch((errorInfo) => {
             console.log("Validation Failed:", errorInfo);
           });
           }}
       okButtonProps={{
        style: {
         backgroundColor: 'wheat', // Change to your desired color
        color: 'white', // Change text color if needed
        border: '1px solid grey', // Remove border if needed
        },
      }}
    >
      <DeliveryPersonForm form={form} onFinish={onFinish} />
        </Modal>

        </Content>
      </Layout>
    </LayoutNew>
  );
};

export default DeliveryPersonManagementPage;
