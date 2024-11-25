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
    key: "main1",
    icon: <ApartmentOutlined />,
    label: "Employees",
    children: [

      {
        key: "1",
        icon: <SyncOutlined />,
        label: "Delivery Employees",
      },

      
    ],
  },

  {
    key: "main2",
    icon: <ApartmentOutlined />,
    label: "Manager",
    children: [
      {
        key: "11",
        icon: <StockOutlined />,
        label: "managerDetail",
      },
      {
        key: "22",
        icon: <SyncOutlined />,
        label: "updateManager",
      },
      
    ],
  },

  

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
      navigate("/managerDet");
    }
    if (item.key === "22") {
      navigate("/ManUpdate:id");
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
