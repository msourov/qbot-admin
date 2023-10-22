import { Layout } from "antd";

import { Content, Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Switcher from "./switcher";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import history from "../history";
import UserDashboard from "./userdashboard";
import { getNoticeListUser } from "../actions/notice";

import ".././style.css";
const PageLayout = (props) => {
  const [active, setActive] = useState("");
  const [countername, setCounterName] = useState("");
  const [countercategories, setCounterCategories] = useState("");
  const [counterno, setCounterNo] = useState("");
  const [staff, setStaff] = useState("");
  const [data, setData] = useState("");

  const fetchData = async () => {
    window.scrollTo(0, 0);
    const res = await getNoticeListUser();

    // console.log(res,'list')

    // console.log(res);
    setData(res);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !localStorage.getItem("authtoken") ||
      localStorage.getItem("authtoken") === null
    ) {
      localStorage.clear();
      history.replace("/login");
    }
    fetchData();

    setActive(localStorage.getItem("active"));
    setCounterName(localStorage.getItem("countername"));
    setCounterCategories(localStorage.getItem("countertype"));
    setStaff(localStorage.getItem("staff"));
    setCounterNo(localStorage.getItem("counterno"));
  }, []);

  return staff == "true" ? (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* {console.log('loader',props.loader.loading)} */}
        <Topbar />

        <Layout className="site-layout">
          <Sidebar />

          <Layout className="site-layout">
            <Content
              style={{ margin: "5px", padding: "0px", boxShadow: "none" }}
            >
              <Switcher />
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Copyright © 2021-2022 hidayahsmart.solutions. All rights reserved.{" "}
        </Footer>
      </Layout>
    </>
  ) : (
    <Layout style={{ minHeight: "100vh" }}>
      {/* {console.log('loader',props.loader.loading)} */}
      <Topbar />

      <Layout className="site-layout">
        <Content style={{ margin: "0px", padding: "0px", boxShadow: "none" }}>
          {/* <UserDashboard/> */}
          <Switcher />
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        {/* {console.log(data)} */}
        <Marquee direction="right" speed={70} delay={5} gradient={true} gradientColor={[255,155,155]}>
          {data
            ? data?.map((item) =>
                item?.categories === null || item?.counter_no === counterno ? (
                  <>
                  {/* {console.log(counterno,'strore')}
                  {console.log(item?.counter_no,'item?.counter')} */}
                    <h1 style={{ margin: "6px 70px",color:'#b20e0e' }}>{item?.value}</h1>
                  </>
                ) : null
              )
            : null}
        </Marquee>
        Copyright © 2021-2022 hidayahsmart.solutions. All rights reserved.{" "}
      </Footer>
    </Layout>
  );
};

export default PageLayout;
