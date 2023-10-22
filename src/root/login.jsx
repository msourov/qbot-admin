import { Button, Form, Input, Layout, Col, message } from "antd";
import React from "react";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {getUsers} from "../actions/account"
import Logo from "./B1.png";
import styled from "styled-components";

const { Footer } = Layout;

const Root = styled.div`
  position: flex;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  position: reletive;
  box-shadow: -2px 6px 17px 2px rgba(0, 0, 0, 0.37);
  transition: 0.3s;
  width: 40%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const Login = () => {

  const onFinish = (values) => {
    console.log(values)
    getUsers(values)
  };

  const ROOT = () => {

   
    return (
      <Root>
        <Card>
          <Col
            span={24}
            style={{
              alignSelf: "center",
              borderRadius: "10px",
              height: "500px",
              backgroundColor: "#fff",
              padding: "20px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <img
              src={Logo}
              alt="bahonexpress"
              style={{ width: "100px", alignSelf: "center" }}
            />

            <Form
              style={{
                alignSelf: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "username is required",
                  },
                ]}
                style={{ alignSelf: "center", width: "100%" }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="User Name"
                  size="large"
                  
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
                style={{ alignSelf: "center", width: "100%" }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  size="large"
                 
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Card>
      </Root>
    );
  };

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      {ROOT()}
      <Footer style={{ textAlign: "center" }}>
        Copyright © 2022-2023 <a  href='https://hidayahsmart.solutions/' rel="noopener noreferrer" target="_blank">hidayahsmart.solutions</a> . All rights reserved.{" "}
      </Footer>
    </Layout>
  );
};

export default Login;
