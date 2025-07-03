import { useState } from "react";
import {
  CloudUploadOutlined,
  HomeOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";
import DarkModeToggle from "./DarkModeToggle";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Flex } from "antd";
import { useAuth } from "./AuthProvider";

const { Content, Sider } = Layout;
const { useToken } = theme;
const { Text, Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const MainLayout = ({ darkMode, setDarkMode }) => {
  const user = useAuth();
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  if (!user.token || Object.keys(user.token).length === 0)
    return <Navigate to="/login" />;
  const defaultSelectedKeys = () => {
    let keys;
    switch (location.pathname) {
      case "/":
        keys = ["1"];
        break;
      case "/subjects":
        keys = ["2"];
        break;
      case "/upload":
        keys = ["3"];
        break;
      default:
        keys = ["1"];
        break;
    }
    return keys;
  };

  const items = [
    getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
    // ,
  ];
  if (user.user.isTeacher)
    items.push(
      getItem(<Link to="/upload">Upload</Link>, "3", <CloudUploadOutlined />)
    );
  else
    items.push(
      getItem(<Link to="/subjects">Subjects</Link>, "2", <SolutionOutlined />)
    );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        className="home-sidebar"
      >
        <div className="demo-logo-vertical">
          <Title
            level={2}
            style={{ color: token.colorPrimary, fontWeight: 800 }}
          >
            {collapsed ? "NS" : "NoteSnap"}
          </Title>
        </div>
        <Menu
          className="sidebar-menu"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={items}
        />
        <Flex className="home-dark-mode-toggle">
          {!collapsed && (
            <Text className="dark-mode-label">
              <div>Night Mode</div>
            </Text>
          )}
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Flex>
        <Button onClick={() => user.logOut()} className="btn-submit">
          Log Out
        </Button>
      </Sider>
      <Content className="content-container">
        <Outlet />
      </Content>
    </Layout>
  );
};
export default MainLayout;
