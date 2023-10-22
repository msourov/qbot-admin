import React, { useEffect, useState } from "react";
import history from "../history";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  message,
  Checkbox,
  Popconfirm,
  Space,
  Spin,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "../actions/api/axios";
import Logo from "./B1.png";
const { Option } = Select;
const UserDashboard = () => {
  const [checkform] = Form.useForm();
  const [watingdata, setWatingData] = useState("");
  const [watingtotaldata, setWatingTotalData] = useState("");
  const [rejectdata, setRejectData] = useState("");
  const [active, setActive] = useState("");
  const [countername, setCounterName] = useState("");
  const [countercategories, setCounterCategories] = useState("");
  const [data, setData] = useState("");
  const [getwhichservingdata, setGetWhichServingData] = useState("");
  const [getholddata, setGetHoldData] = useState("");
  const [getholdtotaldata, setGetHoldTotalData] = useState("");
  const [spins, setSpins] = useState(false);
  const [reqData, setReqData] = useState(null);
  const [btndisabled, setbtndisabled] = useState(false);
  // const [callToken, setCallToken] = useState(false);
  // const [finishcategories, setFinishcategories] = useState(true);

  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };

  // console.log(token)
  const loadData = () => {
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
  };

  useEffect(() => {
    loadData();

    getwating();
    RejectData();
    gethold();
    setInterval(() => {
      getwating();
      RejectData();
      gethold();
    }, 60000);
    // setInterval(() => {

    // getWhichServingToken();
    //   }, 5000);
    getWhichServingToken();
  }, []);

  const hello = (e, data) => {
    try {
      if (e) {
        setReqData(data);
      } else {
        setReqData(null);
      }
      console.log(e);
    } catch (error) {}
  };

  const getwating = async () => {
    await axios
      .get("token/get/PROCESSING", config)
      .then(function (response) {
        // console.log(response)
        if (response.status === 200) {
          //  return response.json();
          // console.log(response.data);
          setWatingData(response.data.detail);
          setWatingTotalData(response.data.total);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const RejectData = async () => {
    await axios
      .get("count/all/REJECT")
      .then(function (response) {
        // console.log(response)
        if (response.status === 200) {
          //  return response.json();
          // console.log(response);
          setRejectData(response.data);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const getServingToken = async () => {
    setSpins(true);
    try {
      const response = await axios.get(`token/get`, config);
      if (response.status === 200) {
        if (response.data.state === false) {
          message.error(response.data.message);
          getwating();
          setSpins(false);
          setData(response.data);

          RejectData();
          // getServingToken();
          // getWhichServingToken();
          gethold();
        } else {
          // setCallToken(true);
          // setFinishcategories(false);
          // window.localStorage.setItem('calltokenstate', 'calltokenstate');

          // console.log("ss", response.data);

          getwating();
          RejectData();
          setSpins(false);
          // getServingToken();
          getWhichServingToken();
          gethold();
        }
        //  return response.json();
      }
      if (response.status === 400 || response.status === 409) {
        message.error(response.data.detail);
        setSpins(false);
        // console.log(response.data.detail);
      }
      if (response.status === 401 || response.status === 403) {
        message.error(response.data.detail);
        setSpins(false);
        localStorage.clear();
        history.push("/login");
      }
    } catch (error) {
      setSpins(false);

      if (error.response.status === 400 || error.response.status === 409) {
        message.error(error.response.data.detail);
        // console.log(error.response.data.detail);
      }
      if (error.response.status === 401 || error.response.status === 403) {
        message.error(error.response.data.detail);
        localStorage.clear();
        history.push("/login");
      }
    }
  };

  const ReCallToken = async () => {
    await axios
      .get(`token/recall`, config)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          message.success("Token Call Succesfully");
          // console.log(btndisabled)
          setbtndisabled(true);
          setInterval(() => {
            setbtndisabled(false);
            // console.log(btndisabled,'ss')
          }, 5000);
          //  return response.json();
        }
      })
      .catch(function (error) {
        if (error.response.status === 400 || error.response.status === 409) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const getWhichServingToken = async () => {
    
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
    try {
      const response = await axios.get(`token/get/serving`, config);

      // console.log(response);
      if (response.status === 200) {
        //  return response.json();
        // console.log(response);

        setGetWhichServingData(response.data);
        setData(response.data);
      }

      if (response.status === 400 || response.status === 409) {
        message.error(response.data.detail);

        // console.log(error.response.data.detail);
      }
      if (response.status === 401 || response.status === 403) {
        message.error(response.data.detail);

        localStorage.clear();
        history.push("/login");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 409) {
        message.error(error.response.data.detail);

        // console.log(error.response.data.detail);
      }
      if (error.response.status === 401 || error.response.status === 403) {
        message.error(error.response.data.detail);
        localStorage.clear();
        history.push("/login");
      }
    }
  };

  const gethold = async () => {
    await axios
      .get(`token/get/HOLD`, config)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          //  return response.json();
          // console.log(response);
          setGetHoldData(response.data.detail);
          setGetHoldTotalData(response.data.total);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400 || error.response.status === 409) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const HoldStatusUpdate = async () => {
    await axios
      .patch(`token/hold`, null, config)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          //  return response.json();
          message.success(response.data.message);
          // console.log('hold',response);
          // setFinishcategories(true);
          // setCallToken(false);

          // console.log("ss", response.data);

          getwating();
          RejectData();
          // getServingToken();
          getWhichServingToken();
          gethold();

          // setGetHoldData(response.data);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400 || error.response.status === 409) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };
  
  const RejectStatusUpdate = async () => {
    await axios
      .patch(`token/reject`, null, config)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          //  return response.json();
          message.success(response.data.message);
          // console.log('hold',response);
          // setFinishcategories(true);
          // setCallToken(false);

          // console.log("ss", response.data);

          getwating();
          RejectData();
          // getServingToken();
          getWhichServingToken();
          gethold();

          // setGetHoldData(response.data);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400 || error.response.status === 409) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const HoldStatustoProcessing = async (id) => {

    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },
    };
    await axios
      .patch(`token/select/hold`, { token_id: id }, config)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          //  return response.json();
          message.success('Token get succesfully');
          // console.log('hold',response);
          // setCallToken(true);
          // setFinishcategories(false);

          // console.log("ss", response.data);

          getwating();
          RejectData();
          // getServingToken();
          getWhichServingToken();
          gethold();

          // setGetHoldData(response.data);
        }
      })

      .catch(function (error) {
        if (error.response.status === 400 || error.response.status === 409) {
          message.error(error.response.data.detail);
          // console.log(error.response.data.detail);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          message.error(error.response.data.detail);
          localStorage.clear();
          history.push("/login");
        }

        // console.log(error.response.data.detail);
      });
  };

  const onFinishcategories = async () => {
    try {
      setSpins(true);

      const response = await axios.patch(
        `token/next`,
        {
          t_counter_categories: reqData == null ? "next" : reqData,
        },
        config
      );

      if (response.status === 200) {
        checkform.resetFields();
        setReqData(null);
        setSpins(false);

        getWhichServingToken();
      }

      if (response.status === 400 || response.status === 409) {
        setSpins(false);
        message.error(response.data.detail);
        // console.log(error.response.data.detail);
      }
      if (response.status === 401 || response.status === 403) {
        setSpins(false);
        message.error(response.data.detail);
        localStorage.clear();
        history.push("/login");
      }
    } catch (error) {
      setSpins(false);

      if (error?.response.status === 400 || error?.response.status === 409) {
        message.error(error?.response.data.detail);
        // console.log(error.response.data.detail);
      }
      if (error?.response.status === 401 || error?.response.status === 403) {
        message.error(error?.response.data.detail);
        localStorage.clear();
        history.push("/login");
      }
    }
  };

  const getareasv = (label, value) => {
    return { label, value };
  };
  // console.log(data);

  let SHOPS = [];
  SHOPS = data
    ? data?.service?.map((item) => getareasv(item.name, item.value))
    : null;
  return (
    <Content style={{ backgroundColor: "#f7f8fc" }}>
      {active ? (
        <>
          {/* <Header
            className="site-layout-background"
            style={{
              backgroundColor: "white",
              color: "#130808",
              marginBottom: "10px",
              boxShadow: "4px 3px 8px 0px rgba(0,0,0,0.20)",
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            <Row>
              <Col sm={8} style={{ alignSelf: "center" }}>
                <img
                  src={Logo}
                  alt=""
                  width="120px"
                  style={{ marginBottom: "10px", padding: "5px" }}
                />
              </Col>
              <Col sm={8}>
                {countername} :{" "}
                {countercategories === "reg" ? (
                  <strong>Registration</strong>
                ) : countercategories === "xray" ? (
                  <strong>Xray</strong>
                ) : countercategories === "m_doctor" ? (
                  <strong>Male Doctor</strong>
                ) : countercategories === "f_doctor" ? (
                  <strong>Female Doctor</strong>
                ) : countercategories === "eye" ? (
                  <strong>Vaccine</strong>
                ) : countercategories === "urin" ? (
                  <strong>Sample Test</strong>
                ) : null}
              </Col>

              <Col
                sm={8}
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  right: "20px",
                }}
              >
                <Button
                  type="danger"
                  // shape="circle"
                  style={{ marginBottom: "30px", borderRadius: "122px" }}
                  onClick={() => {
                    localStorage.clear();
                    history.push("/login");
                  }}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Header> */}

          {getwhichservingdata.state ? (
            // <Space size="middle"><Spin size="large" >
            <Row>
              <Col
                xs={24}
                lg={16}
                md={12}
                sm={24}
                style={{
                  marginTop: "10px",

                  backgroundColor: "#f2ffff",

                  // textAlign: "center",
                }}
              >
                <Row gutter={16}>
                  <Col
                    xs={24}
                    lg={15}
                    md={12}
                    sm={24}
                    style={{
                      // marginTop: "10px",

                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Card
                      style={{
                        alignSelf: "center",
                        // boxShadow: "0px 2px 4px 2px rgba(0,0,0,0.64)",
                        backgroundColor: "#fcfcfc",
                        marginLeft: "12rem",
                        marginTop: "40px",
                        marginBottom: "5px",

                        width: "200px",
                      }}
                    >
                      <h3 style={{ marginTop: "10px" }}>
                        {moment.utc(Date()).format("YYYY-MM-DD hh:mm A")}
                      </h3>
                      <h2>Now Serving </h2>
                      <p style={{ color: "#ff4f4f", fontSize: "30px" }}>
                        T-{getwhichservingdata?.detail?.token_id}{" "}
                        <strong
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#cf9c92",
                          }}
                        >
                          {getwhichservingdata?.detail?.token_status}
                        </strong>
                      </p>
                    </Card>

                    <Row style={{ marginTop: "22px" }}>
                      <Col xs={24} lg={8} md={8} sm={24}>
                        <Popconfirm
                          title="Are you sure？"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => {
                            HoldStatusUpdate();
                          }}
                        >
                          <Button
                            // type="primary"
                            style={{
                              marginLeft: "13px",
                              width: "150px",
                              backgroundColor: "#ee9611",
                              color: "white",
                              fontWeight: "600px",
                            }}
                          >
                            Hold
                          </Button>
                        </Popconfirm>
                      </Col>
                      {btndisabled ? (
                        <Space size="middle">
                          <Spin size="large">
                            <Col xs={24} lg={8} md={8} sm={24}>
                              <Popconfirm
                                title="Are you sure？"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => {
                                  ReCallToken();
                                }}
                              >
                                <Button
                                  style={{
                                    marginLeft: "22px",
                                    width: "150px",
                                    backgroundColor: "#3ab569",
                                    color: "white",
                                    fontWeight: "600px",
                                  }}
                                >
                                  Recall
                                </Button>
                              </Popconfirm>
                            </Col>
                          </Spin>
                        </Space>
                      ) : (
                        <Col xs={24} lg={8} md={8} sm={24}>
                          <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              ReCallToken();
                            }}
                          >
                            <Button
                              style={{
                                marginLeft: "22px",
                                width: "150px",
                                backgroundColor: "#3ab569",
                                color: "white",
                                fontWeight: "600px",
                              }}
                            >
                              Recall
                            </Button>
                          </Popconfirm>
                        </Col>
                      )}

                      <Col xs={24} lg={8} md={8} sm={24}>
                        <Popconfirm
                          title="Are you sure？"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => {
                            RejectStatusUpdate();
                          }}
                        >
                          <Button
                            type="danger"
                            style={{
                              marginLeft: "30px",
                              width: "150px",
                              fontWeight: "600px",
                            }}
                          >
                            Reject
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>

                    {/* <p>Issue Time: {moment
                .utc(getwhichservingdata?.detail?.create_at)
                .format("YYYY-MM-DD hh:mm A")}</p>
            <p>Registration : {getwhichservingdata?.detail?.reg?<strong style={{color:"#3cd677"}}>Finished</strong>:<strong  style={{color:"#f70c0c"}}>Unfinished</strong>}</p>
            <p>Xray : {getwhichservingdata?.detail?.xray?<strong style={{color:"#0eb84f"}}>Finished</strong>:<strong  style={{color:"#f70c0c"}}>Unfinished</strong>}</p>
            <p>Doctor : {getwhichservingdata?.detail?.m_doctor ||getwhichservingdata?.detail?.m_doctor?<strong style={{color:"#42c473"}}>Finished</strong>:<strong  style={{color:"#f70c0c"}}>Unfinished</strong>}</p>
            <p>Eye : {getwhichservingdata?.detail?.eye?<strong style={{color:"#3cd677"}}>Finished</strong>:<strong  style={{color:"#f70c0c"}}>Unfinished</strong>}</p>
            <p>Urin : {getwhichservingdata?.detail?.urin?<strong style={{color:"#3cd677"}}>Finished</strong>:<strong  style={{color:"#f70c0c"}}>Unfinished</strong>}</p>
            <p>Counter No : {getwhichservingdata?.detail?.counter}</p>
            <p>Token Picked : {getwhichservingdata?.detail?.is_picked?<strong style={{color:"#3cd677"}}>Picked</strong>:<strong  style={{color:"#f70c0c"}}>Unpicked</strong>}</p>
            <p>Token Status : {getwhichservingdata?.detail?.token_status}</p>
            */}
                  </Col>
                  <Col
                    xs={24}
                    lg={8}
                    md={12}
                    sm={24}
                    style={{
                      // marginTop: "10px",

                      backgroundColor: "#ffff",
                      // marginTop: "10px",
                      // textAlign: "center",
                    }}
                  >
                    <h2 style={{ textAlign: "center" }}>Send To</h2>
                    {/* {console.log(
                    checkeye,
                    checkfdoctor,
                    checkmdoctor,
                    checkxray,
                    checkurin
                  )} */}
                    {/* {checkeye || checkfdoctor || checkmdoctor ||checkxray || checkurin } */}
                    <Form
                      name="basic"
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 10 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinishcategories}
                      // onFinishFailed={onFinishFailedEdit}
                      style={{
                        alignSelf: "center",
                        boxShadow: "0px 2px 5px -2px rgba(0,0,0,0.75)",
                        backgroundColor: "#fff",
                        height: "60vh",
                        overflow: "auto",
                      }}
                      requiredMark={false}
                      form={checkform}
                    >
                      {/* <Form.Item
                        name="counter_categories"
                        label="Category Type"
                       
                        style={{ alignSelf: "center",marginTop:'20px' }}
                        // style={{ marginLeft: "30px" }}

                        // wrapperCol={{ offset: 2 }}
                        //defaultValue={false}
                      >
                        <Select
                          name="counter_categories"
                          showSearch
                          // size="large"
                          onChange={(e) => {
                            setReqData(e);
                            // console.log(e,'value')
                          }}
                          //   rules={[{ required: true, message: "This Field is required" }]}
                          options={SHOPS}
                          placeholder="Select One"
                        />
                        
                      </Form.Item> */}
                       <Form.Item
            name="counter_categories"
            label="Counter Type"
           
            style={{ alignSelf: "center", width: "100%",marginTop:'20px' }}
          >
            <Select
              showSearch
              placeholder="Select One"
              // size="large"
            
              onChange={(e) => {
                setReqData(e);
              }}
              
            >
             
             
              { data?
              data?.service?.map(item => 
                <>
               
              { 
                
                item?.is_done===false && item?.value!==countercategories?
                  <Option value={item.value}>{item.name}</Option>:null}

                </>
               
               
                
                    
                ):null}
              <Option value="next">Auto-Serveing</Option>
          
            
              
            </Select>
          </Form.Item>

                      {/* {console.log(spins)} */}
                      {spins ? (
                        <Space size="middle">
                          <Spin size="large">
                            <Row style={{ textAlign: "center" }}>
                              <Col xs={24} lg={12} md={12} sm={24}>
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    shape="round"
                                    style={{
                                      width: "120px",
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {reqData != null ? "Done" : "Next"}
                                  </Button>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Spin>
                        </Space>
                      ) : (
                        <Row style={{ textAlign: "center" }}>
                          <Col xs={24} lg={12} md={12} sm={24}>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                style={{
                                  width: "120px",
                                  marginLeft: "80px",
                                }}
                              >
                                {reqData != null ? "Done" : "Next"}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                      <>
                      
                      <p
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          // padding: "18px",
                        }}
                      >
                        Note If you don't want to select click{" "}
                        <strong>Next</strong>
                      </p>
                      {data?
                      data?.service?.map((i) => (
                        <h4 style={{ textAlign:'center', color: "black" }}>
                          {i?.name} : <strong>{i.is_done?<strong style={{color:'#3ab569'}}>Finished</strong>:<strong style={{color:'red'}}>Unfinished</strong>}</strong>
                        </h4>))
                      :null}
                      
                      </>

                      
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={24}
                lg={8}
                md={12}
                sm={24}
                style={{
                  marginTop: "10px",

                  textAlign: "center",
                }}
              >
                <Row
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {/* {console.log(watingtotaldata)} */}
                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#4adf83" }}>
                      Wating {watingtotaldata}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#f1fff7",
                        // boxShadow: '0px 3px 3px 2px rgba(0,0,0,0.64)',
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {watingdata?.length > 0 ? (
                        watingdata?.map((i) => (
                          <h4 style={{ color: "#4adf83" }}>
                            Token <strong>{i.token_id}</strong>
                          </h4>
                        ))
                      ) : (
                        <h1>No Wating Token</h1>
                      )}
                    </Card>
                  </Col>

                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#ee9611" }}>
                      Hold {getholdtotaldata}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#fdfaf4",
                        // boxShadow: "2px 1px 0px 3px rgba(0,0,0,0.75)",
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {/* {console.log(getholddata.detail)} */}
                      {getholddata?.length > 0 ? (
                        getholddata?.map((i) => (
                          <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              HoldStatustoProcessing(i.token_id);
                            }}
                          >
                            <h4 style={{ color: "#ee9611" }}>
                              Token <strong>{i.token_id}</strong>
                            </h4>
                          </Popconfirm>
                        ))
                      ) : (
                        <h4> No Hold Token</h4>
                      )}
                    </Card>
                  </Col>
                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#ff382a" }}>
                      Reject {rejectdata.length}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#fff3f0",
                        // boxShadow: "2px 1px 0px 3px rgba(0,0,0,0.75)",
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {rejectdata.length > 0 ? (
                        rejectdata.map((i) => (
                          <h4 style={{ color: "#ff382a" }}>
                            Token <strong>{i.token_id}</strong>
                          </h4>
                        ))
                      ) : (
                        <h4>No Reject Token</h4>
                      )}
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : // </Spin></Space>
          null}

          {/* {console.log(!getwhichservingdata.state )} */}
          {!getwhichservingdata.state ? (
            <Row>
              <Col
                xs={24}
                lg={12}
                md={12}
                sm={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {spins ? (
                  <Space size="middle">
                    <Spin size="large">
                      <Button
                        onClick={() => {
                          getServingToken();
                        }}
                        type="primary"
                        shape="round"
                        style={{
                          color: "black",
                          width: "200px",
                          textAlign: "center",
                        }}
                      >
                        Call Token
                      </Button>
                    </Spin>
                  </Space>
                ) : (
                  <Button
                    onClick={() => {
                      getServingToken();
                    }}
                    type="primary"
                    shape="round"
                    style={{
                      color: "black",
                      width: "200px",
                      textAlign: "center",
                    }}
                  >
                    Call Token
                  </Button>
                )}
                &nbsp;&nbsp;
              </Col>
              <Col
                xs={24}
                lg={12}
                md={12}
                sm={24}
                style={{ textAlign: "center" }}
              >
                <Row
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#4adf83" }}>
                      Wating {watingtotaldata}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#f1fff7",
                        // boxShadow: '0px 3px 3px 2px rgba(0,0,0,0.64)',
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {watingdata?.length > 0 ? (
                        watingdata?.map((i) => (
                          <h4 style={{ color: "#4adf83" }}>
                            Token <strong>{i.token_id}</strong>
                          </h4>
                        ))
                      ) : (
                        <h1>No Wating Token</h1>
                      )}
                    </Card>
                  </Col>

                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#ee9611" }}>
                      Hold {getholdtotaldata}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#fdfaf4",
                        // boxShadow: "2px 1px 0px 3px rgba(0,0,0,0.75)",
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {getholddata?.length > 0 ? (
                        getholddata?.map((i) => (
                          <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              HoldStatustoProcessing(i.token_id);
                            }}
                          >
                            <h4 style={{ color: "#ee9611" }}>
                              Token <strong>{i.token_id}</strong>
                            </h4>
                          </Popconfirm>
                        ))
                      ) : (
                        <h4> No Hold Token</h4>
                      )}
                    </Card>
                  </Col>
                  <Col xs={24} lg={8} md={24} sm={24}>
                    <h2 style={{ color: "#ff382a" }}>
                      Reject {rejectdata.length}
                    </h2>

                    <Card
                      hoverable
                      style={{
                        padding: "5px",
                        backgroundColor: "#fff3f0",
                        // boxShadow: "2px 1px 0px 3px rgba(0,0,0,0.75)",
                        height: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {rejectdata.length > 0 ? (
                        rejectdata.map((i) => (
                          <h4 style={{ color: "#ff382a" }}>
                            Token <strong>{i.token_id}</strong>
                          </h4>
                        ))
                      ) : (
                        <h4>No Reject Token</h4>
                      )}
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : null}
        </>
      ) : (
        <h1>User is not active</h1>
      )}
      {/* <Footer
        style={{
          position: "fixed",
          width: "100%",
          textAlign: "center",
          bottom: "0",
        }}
      >
        {" "}
        Copyright © 2022-2023{" "}
        <a href="https://hidayahsmart.solutions/" rel="noopener noreferrer" target="_blank">
          hidayahsmart.solutions
        </a>{" "}
        . All rights reserved.
      </Footer> */}
    </Content>
  );
};

export default UserDashboard;
