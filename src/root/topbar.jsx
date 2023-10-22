import { EyeOutlined, KeyOutlined, PoweroffOutlined,NotificationOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Dropdown,
  Menu,
  Form,
  Drawer,
  Input,
  Avatar,
  Badge,
  Space,
} from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { UpdateOwnPassword } from "../actions/user";
import history from "../history";

import Logo from "./B1.png";

const Topbar = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setVisible(true);
  };

  const onFinish = async (values) => {
    const code = await UpdateOwnPassword(values);
    if (code === 201) {
      form.resetFields();
      setVisible(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log(errorInfo);
  };
  const onClose = () => {
    setVisible(false);
  };
  const DrawerFun = () => {
    return (
      <Drawer
        title="Update Password"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="500"
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Old Password"
            name="old_password"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  };
  const menu = () => (
    <>
      <Menu>
        <Menu.Item
          onClick={() => {
            setVisible(true);
          }}
        >
          <KeyOutlined /> Password Setting
        </Menu.Item>
        <Menu.Item
          style={{
            textAlign: "center",
          }}
        >
          <Button
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            <PoweroffOutlined />
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
  
  // const menu1 = () => (
  //   <>
  //     <Menu>
  //       <Menu.Item
  //         onClick={() => {
  //           setVisible(true);
  //         }}
  //       >
  //         <KeyOutlined /> Password Setting shsadkjhdas assd
  //       </Menu.Item>
  //       <Menu.Item
  //         style={{
  //           textAlign: "center",
  //         }}
  //       >
  //         <Button
  //           onClick={() => {
  //             localStorage.clear();
  //             history.push("/login");
  //           }}
  //         >
  //           <PoweroffOutlined />
  //           Logout
  //         </Button>
  //       </Menu.Item>
  //     </Menu>
  //   </>
  // );

  const RowCol = () => {
    return (
      <>
        <Row style={{ display: "flex" }}>
          <Col sm={12} style={{ alignSelf: "center" }}>
            <img
              src={Logo}
              alt=""
              width="120px"
              style={{ cursor: "pointer", padding: "5px" }}
              onClick={() => history.push("/")}
            />
          </Col>

          <Col
            sm={12}
            style={{ alignSelf: "center", position: "absolute", right: "20px" }}
          >
            <span> {localStorage.getItem("countername")}</span>
            &nbsp; &nbsp;
            <Dropdown overlay={menu()} placement="bottomRight">
              <Button type="primary" shape="circle" icon={<EyeOutlined />} />
            </Dropdown>&nbsp;
            {/* {
    localStorage.getItem('staff')==='true'?
    null
    :
    <Dropdown overlay={menu1()}  placement="bottomRight">
            <Space size="large">
              <Badge count={99}>
              <Button type="primary" shape="circle" icon={<NotificationOutlined /> } />
              </Badge>
            </Space>
            </Dropdown>
  }
             */}
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Header
      className="site-layout-background"
      style={{
        backgroundColor: "white",
        color: "#130808",
        marginBottom: "10px",
        boxShadow: "4px 3px 8px 0px rgba(0,0,0,0.20)",
      }}
    >
      {RowCol()}
      {DrawerFun()}
      
    </Header>
  );
};

export default Topbar;
