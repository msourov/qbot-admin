import React, { useEffect } from "react";
import { Drawer, Form, Input, Menu, Modal, Popconfirm, Select } from "antd";
import {
  Descriptions,
  Breadcrumb,
  PageHeader,
  Tag,
  Empty,
  Timeline,
  Button,
} from "antd";

import styled from "styled-components";
import { useState } from "react";
import moment from "moment";
import {
  CheckCircleOutlined,
  CheckSquareFilled,
  EditOutlined,
  EyeOutlined,
  KeyOutlined,
  StopOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import {
  getPreviousTokenListById,
  getTodayTokenListById,
} from "../../../actions/token";

export const Title = styled.div`
  width: 100%;
  background-color: #00b4d8;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  text-align: center;
`;
export const Wrapper = styled.div`
  padding: 20px;
`;
const TokenDetailsPrevious = ({ location }) => {
  const token_id = new URLSearchParams(location.search).get("token_id");
  const [data, setData] = useState([]);
  console.log(token_id);
  async function fetchData() {
    const res = await getPreviousTokenListById(token_id);

    setData(res);

    // console.log('1st',res);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  const pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Token Details"
      subTitle="Report Management"
    ></PageHeader>
  );

  const tokendetails = (
    <Wrapper>
      {data ? (
        <>
          <Title>Token Information </Title>
          <br />

          <Descriptions>
            <Descriptions.Item label="Token Number">
              <strong>{data?.token_no}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Token Id">
              <strong>{data?.token_id}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Token status">
              <strong>{data?.token_status}</strong>
            </Descriptions.Item>

            <>
              {data?.counter_no ? (
                <Descriptions.Item label="Counter NO">
                  <strong>{data?.counter_no}</strong>
                </Descriptions.Item>
              ) : null}
            </>

            <Descriptions.Item label="Date">
              <strong>
                {moment.utc(data?.created_at).format("YYYY-MM-DD hh:mm A")}
                &nbsp; {""}
              </strong>
            </Descriptions.Item>
          </Descriptions>

          {data?.service ? (
            <>
              {data?.service.map((item, index) => (
                <>
                  <Title key={index}>
                    {item?.name} Category{" "}
                    <b style={{ color: "red" }}>
                      {item?.special_case ? "Special" : null}
                    </b>
                  </Title>
                  <br />
                  <Descriptions>
                    <Descriptions.Item label="ID">
                      <strong>{item?.token}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Name">
                      <strong>{item?.name}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sequence">
                      <strong>{item?.sequence}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Serving">
                      {item?.is_done ? <h1>Finish</h1> : <h1>Unfinish</h1>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Token status">
                      <strong>{item?.token_status}</strong>
                    </Descriptions.Item>
                    {item?.serving ? (
                      <Descriptions.Item label="Counter Number">
                        <strong>{item?.serving}</strong>
                      </Descriptions.Item>
                    ) : null}

                    {item?.is_picked ? (
                      <Descriptions.Item label="Pickup ">
                        <strong>Done</strong>
                      </Descriptions.Item>
                    ) : null}
                    <Descriptions.Item label="Create Date">
                      <strong>
                        {moment
                          .utc(item?.created_at)
                          .format("YYYY-MM-DD hh:mm A")}
                      </strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="start Time">
                      <strong>
                        {moment
                          .utc(item?.start_time)
                          .format("YYYY-MM-DD hh:mm A")}
                      </strong>
                    </Descriptions.Item>

                    <Descriptions.Item label="End Time">
                      <strong>
                        {moment
                          .utc(item?.end_time)
                          .format("YYYY-MM-DD hh:mm A")}
                      </strong>
                    </Descriptions.Item>
                  </Descriptions>
                </>
              ))}
            </>
          ) : null}
        </>
      ) : null}
    </Wrapper>
  );
  return (
    <Content>
      {pageheader}
      {tokendetails}
    </Content>
  );
};

export default TokenDetailsPrevious;
