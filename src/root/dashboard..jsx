import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Divider } from "antd";
import {
  LikeOutlined,
 
} from "@ant-design/icons";
import { Column, Line, Pie, getCanvasPattern } from "@ant-design/plots";
import history from "../history";
import { getallToken } from "../actions/dashboard";

const Dashboard = () => {
  const [access, setAccess] = useState('');
  const [active, setActive] = useState("");
  const [data, setData] = useState([]);
  const [countername, setCounterName] = useState("");
  const [countercategories, setCounterCategories] = useState("");
  async function fetchData() {
    
    window.scrollTo(0, 0);
    const res = await getallToken();
    console.log(res)
    const piechartData = [];
    piechartData.push(
      {
        type: "Hold",
        value: res?.hold,
      },
      {
        type: "Done",
        value: res?.done,
      },
      {
        type: "Reject",
        value: res?.reject,
      },
      {
        type: "Processing",
        value: res?.processing,
      }
    );
    
    setData(piechartData);
    
    
  }

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
        fetchData()
        
      }, [])
  
  // console.log(access)

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    // 自定义状态样式
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    // 添加 element 选中和激活交互
    interactions: [
      {
        type: "element-single-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  const Total_statistic = (
    <>
     <Divider>Total Token Statistic</Divider>
  <Pie {...config} />
    </>
 );

  return (
    <Content>
      {Total_statistic}
    </Content>
  );
};

export default Dashboard;
