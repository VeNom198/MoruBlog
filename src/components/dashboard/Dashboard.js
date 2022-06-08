import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Route, Routes, Router, useLocation, Outlet } from "react-router-dom";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import DashboardForm from "./DashboardForm";
import BlogDetails from "./BlogDetails";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetUserDetailssuccess } from "../../redux/GetAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { GetUnverifiedBlog } from "../../redux/GetUnverifiedBlogs";

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items2 = [
  //   getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Blogs Details", "1", <FileOutlined />),
  getItem("Add Blog", "2", <DesktopOutlined />),

  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
];

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const Dashboard = () => {
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const getUnverifiedBlogs = async () => {
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/review_posts",
      config
    );
    if (response.status === 200) {
      dispatch(GetUnverifiedBlog(response.data.posts));
    }
  };
  const getallUsers = async () => {
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/account"
    );
    if (response.status === 200) {
      dispatch(GetUserDetailssuccess(response.data.users));
    }
  };
  useEffect(() => {
    getUnverifiedBlogs();
    getallUsers();
  }, []);

  return (
    <Layout hasSider>
      <>
        <Sider
          collapsible
          collapsed={collapse}
          onCollapse={() => setCollapse(!collapse)}
          style={{
            height: "100vh",
            position: "fixed",
          }}
        >
          <div className="dashboard-logo" style={{ marginTop: "10px" }}>
            <Link to="/dashboard">
              <img
                src="images/moru.jpg"
                alt="logo"
                style={{ height: "37px" }}
              ></img>
            </Link>
          </div>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            //   defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              marginTop: "11px",
            }}
          >
            <Menu.Item key="1">
              <Link to="blog-details">
                <FileOutlined />
                <span>Blog Details</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="add-blogs">
                <DesktopOutlined />
                <span>Add Blogs</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="verify-blogs">
                <CalendarOutlined />
                <span>Verify Blogs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="allusers">
                <UserOutlined />
                <span>User Details</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/" onClick={() => refreshPage()}>
                <LogoutOutlined />
                <span>Log Out</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapse ? 80 : 200 }}
        >
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              <Outlet />
            </div>
          </Content>
          {/* <Footer
            style={{ textAlign: "center", position: "sticky", bottom: "0" }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </>
    </Layout>

    // </div>
  );
};

export default Dashboard;
