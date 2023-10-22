import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  GatewayOutlined,
  ProfileOutlined,
  CarOutlined,
  ClusterOutlined,
  HolderOutlined,
  InsertRowLeftOutlined,
  DeliveredProcedureOutlined,
  CopyrightOutlined,
  SubnodeOutlined,
  DotChartOutlined,
  SoundOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  NotificationOutlined,
  AliyunOutlined,
  HomeOutlined,
  LineChartOutlined,
  MediumOutlined,
  MessageOutlined,
  MonitorOutlined,
  InsertRowAboveOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
  FormatPainterOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  RocketOutlined,
  SearchOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  ShopTwoTone,
  PictureOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  ConsoleSqlOutlined,
  UserSwitchOutlined,
  VerticalAlignTopOutlined,
  AndroidOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import history from "../history";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [access, setAccess] = useState(null);

  const [active, setActive] = useState("");
  const [countername, setCounterName] = useState("");
  const [countercategories, setCounterCategories] = useState("");
  const [staff, setStaff] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !localStorage.getItem("authtoken") ||
      localStorage.getItem("authtoken") === null
    ) {
      localStorage.clear();
      history.replace("/login");
    }

    setActive(localStorage.getItem("active"));
    setCounterName(localStorage.getItem("countername"));
    setCounterCategories(localStorage.getItem("countertype"));
    setStaff(localStorage.getItem("staff"));
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  {
    /* <ul class="ant-menu ant-menu-light ant-menu-inline-collapsed ant-menu-root ant-menu-vertical" role="menu"/> */
  }
  return staff ? (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="280px"
        breakpoint="sm"
        collapsedWidth="80"
        style={{
          backgroundColor: "white",
          boxShadow: "4px 3px 8px 0px rgba(0,0,0,0.10)",
        }}
      >
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          {/* <SubMenu
            key="Tv-App-management"
            icon={<AndroidOutlined />}
            title="TV App Management"
          >
            <Menu.Item key="image_list" icon={<PictureOutlined  />}>
              <Link to="/image-list">Image List</Link>
            </Menu.Item>
           
          </SubMenu>
       */}

          <SubMenu
            key="Dekstop-App-Managemnent"
            icon={<ConsoleSqlOutlined />}
            title="Desktop App Management"
          >
            <Menu.Item key="logo_management" icon={<PictureOutlined />}>
              <Link to="/company-logo">Company Logo</Link>
            </Menu.Item>
            <Menu.Item key="Company_Name" icon={<CopyrightOutlined />}>
              <Link to="/company-name">Company Name</Link>
            </Menu.Item>

            <Menu.Item key="Dekstop_name_List" icon={<ProfileOutlined />}>
              <Link to="/dekstop-name-list">Dekstop Name List</Link>
            </Menu.Item>
          </SubMenu>

          {/* Zone */}

          <SubMenu
            key="user"
            icon={<UserSwitchOutlined />}
            title="User Management"
          >
            <Menu.Item key="user_list" icon={<UserAddOutlined />}>
              <Link to="/user-list">User List</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="Categories-management"
            icon={<FormatPainterOutlined />}
            title="Category Management"
          >
            <Menu.Item key="Category_list" icon={<ClusterOutlined />}>
              <Link to="/categories-list">Categories List</Link>
            </Menu.Item>
            <Menu.Item key="sequence_list" icon={<InsertRowLeftOutlined />}>
              <Link to="/sequence-categories">Sequence Category</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="token"
            icon={<HourglassOutlined />}
            title="Report Management"
          >
            <Menu.Item key="today_token_list" icon={<HolderOutlined />}>
              <Link to="/today-token-list">Today Token List</Link>
            </Menu.Item>
            <Menu.Item key="previous-token_list" icon={<OrderedListOutlined />}>
              <Link to="/previous-token-list">Previous Token List</Link>
            </Menu.Item>
            {/* `<Menu.Item key="parcel_search" icon={<MonitorOutlined />}>
              <Link to="/search-parcel">Parcel Search</Link>
            </Menu.Item>

            <Menu.Item key="parcel_create" icon={<PlusSquareOutlined />}>
              <Link to="/create-parcel">Parcel Create</Link>
             
             
            </Menu.Item>
            <Menu.Item key="bulk_create" icon={<PlusCircleOutlined />}>
            <Link to="/create-bulk">Bulk Create</Link>
            </Menu.Item>
            <Menu.Item key="parcel_custom_create" icon={<PlusOutlined />}>
            <Link to="/create-custom-parcel">Create Custom Parcel</Link> 
            </Menu.Item>
            <Menu.Item key="parcel_deliver" icon={<RocketOutlined />}>
              <Link to="/delivery-parcel">Parcel Delivery</Link>
            </Menu.Item>` */}
          </SubMenu>

          {/* Deliver Man */}

          {/* <SubMenu
            key="display"
            icon={<GatewayOutlined />}
            title="Display Management "
          >
            <Menu.Item key="display_list" icon={<InsertRowAboveOutlined />}>
              <Link to="/display-list">Display List</Link>
            </Menu.Item>
          </SubMenu> */}

          <SubMenu
            key="notice"
            icon={<NotificationOutlined />}
            title="Notice Management "
          >
            <Menu.Item key="notice_list" icon={<SubnodeOutlined />}>
              <Link to="/notice-list">Notice List</Link>
            </Menu.Item>
          </SubMenu>

          {/* <SubMenu
            key="sound"
            icon={<SoundOutlined />}
            title="Sound Management "
          >
            <Menu.Item key="sound_list" icon={<SoundOutlined />}>
              <Link to="/sound">Sound Information</Link>
            </Menu.Item>
          </SubMenu> */}
          <Menu.Item key="sound_list" icon={<PhoneOutlined />}>
            <Link to="/support">Support</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  ) : null;
};

export default Sidebar;
