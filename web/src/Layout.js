import React, { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  StockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { FloatButton,Badge } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const adminUserItems = [

  {
label:"ADMIN PANEL"
  },

  {
    key: "main2",
    icon: <ApartmentOutlined />,
    label: "Delivery",
    children: [
      {
        key: "1",
        icon: <SyncOutlined />,
        label: "Delivery Employees",
      },
      {
        key: "11",
        icon: <StockOutlined />,
        label: "Delivery Details",
      },

      
    ],
  },

  //pack
  {
    key: "pack",
    icon: <ApartmentOutlined />,
    label: "Package",
    children: [
      {
        key: "porder",
        icon: <StockOutlined />,
        label: "package orders",
      },
      {
        key: "addmaterial",
        icon: <StockOutlined />,
        label: "Add Material",
      },
      {
        key: "material",
        icon: <StockOutlined />,
        label: "Material",
      },
    ]
    },
  //product
  {
    key: "pro",
    icon: <ApartmentOutlined />,
    label: "Products",
    children: [
      {
        key: "dash",
        icon: <StockOutlined />,
        label: "Dashbord",
      },
      {
        key: "addpro",
        icon: <StockOutlined />,
        label: "Add product",
      },
      {
        key: "adminpro",
        icon: <StockOutlined />,
        label: "Admin Product",
      },

    ],
  },
  {
    key: "payad",
    icon: <ApartmentOutlined />,
    label: "Payment",
  },
  {
    key: "complaint",
    icon: <ApartmentOutlined />,
    label: "Complaints",
  },
  {
    key: "return",
    icon: <ApartmentOutlined />,
    label: "Return",
  },
  {
    key: "order",
    icon: <ApartmentOutlined />,
    label: "Orders",
  },
  {
    key: "user",
    icon: <ApartmentOutlined />,
    label: "User",
  }


];

const App = ({ children, userType }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isBackTopVisible, setIsBackTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsBackTopVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (item) => {

    if (item.key === "1") {
      navigate("/delper");
    }

    if (item.key === "11") {
      navigate("/mdet");
    }

    if (item.key === "porder") {
      navigate("/packorder");
    }
    if (item.key === "addmaterial") {
      navigate("/addMaterials");
    }
    if (item.key === "material") {
      navigate("/materials");
    }

    if (item.key === "dash") {
      navigate("/dashboard");
    }
    if (item.key === "addpro") {
      navigate("/addproduct");
    }
    if (item.key === "adminpro") {
      navigate("/adminproduct");
    }
    if (item.key === "payad") {
      navigate("/admin-profile");
    }
    if (item.key === "complaint") {
      navigate("/complaint");
    }
    if (item.key === "return") {
      navigate("/returnpro");
    }
    if (item.key === "order") {
      navigate("/order");
    }
    if (item.key === "user") {
      navigate("/user-details");
    }

  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();



  return (
    <Layout style={{ minHeight: "100vh" }}>
<Sider
  collapsible
  collapsed={collapsed}
  onCollapse={(value) => setCollapsed(value)}
  width={225}
  style={{ backgroundColor: "#D1BB9E", overflow: "hidden", position: "fixed", height: "100vh", left: 0 }}
>
  <style>
    {`
      .ant-menu-item:hover {
        background-color: white !important;
        color: blue !important; /* Parent color change */
      }

      .ant-menu-item-child {
        background-color: wheat !important;
      }
    `}
  </style>
  <Menu
    theme="light"
    defaultSelectedKeys={["dashboard"]}
    mode="inline"
    items={userType === "admin" ? adminUserItems : adminUserItems}
    onClick={handleMenuClick}
    style={{ backgroundColor: "#EAD8C0", color: "#ffffff", marginTop: "70px" }}
  />
</Sider>



     <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>



        <Content style={{ marginTop: 64, padding: 24  }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: borderRadiusLG,
            }}
          >
            {isBackTopVisible && (
              <FloatButton.Group shape="circle" style={{ right: 24 }}>
                <FloatButton.BackTop visibilityHeight={0} />
              </FloatButton.Group>
            )}
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default App;
