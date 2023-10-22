import React, { useEffect, useState } from "react";

import {
  Table,
  Input,
  Button,
  PageHeader,
  Popconfirm,
  Tag,
  Form,
  Modal,
  Card,
  Row,
  Col,Select
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  SearchOutlined,  EditOutlined,SoundOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { getNoticeList ,NoticeStatusUpdate,NoticeDelete, getUserCategoriesList, getUserCounterList, NoticeCreate} from "../../../actions/notice";
import { getSoundList, SoundStatusUpdate } from "../../../actions/sound";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const Sound = () => {
  const [data, setData] = useState("");
  const [counterdata, setCounterData] = useState("");
  const [categorieslists, setCategoriesList] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cvalue, setValue] = useState("");
  const [types, setTypes] = useState("");
  const [cname, setName] = useState("");
  const [csequence, setSequence] = useState("");
  const [ctype, setType] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const [countertype, setCounterType] = useState("");
  const [Cstate, setCState] = useState(false);
  const fetchData=async()=>{
    window.scrollTo(0, 0);
    const res = await getSoundList();
    
    setData(res);
  }

  useEffect( () => {
    fetchData()
    
  }, []);






  const handleRefresh = async () => {
    const res = await getSoundList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    
    // console.log(name, status);

    const code =await SoundStatusUpdate(name, status)
    console.log(code)
    if (code === 201) {
      

      
      handleRefresh();
    }
  };




  const searchColumns = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            style={{ marginBottom: 8, display: "block" }}
          ></Input>
          {/* <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            type="danger"
            style={{ width: 90 }}
          >
            Reset
          </Button> */}
        </div>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "20%",
      ...searchColumns("id"),
    },
    {
      title: "Sound Type ",
      dataIndex: "level",
      key: "level",
      width: "30%",
      ...searchColumns("level"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...searchColumns("status"),
    },
    
    {
      title: "Voice Change ",
      dataIndex: "gender",
      key: "gender",
      width: "15%",
      ...searchColumns("gender"),
    },
    {
      title: "Sound Speed ",
      dataIndex: "speed",
      key: "speed",
      width: "15%",
      ...searchColumns("speed"),
    },
    
    
  ];
 
  const createData = (id, level,status,gender,speed) => {
    return { id, level,status, status,gender,speed };
  };
 
 
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            
               
            i?.level,
            <>
              {i?.selected ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.level, false)}
                  >
                    <Button size="small" type="danger"  icon={<StopOutlined />}>
                      Disable
                    </Button>
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Tag color="#f50">Inactive</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.level, true)}
                  >
                    <Button
                      size="small"
                      type="primary"
                      icon={<CheckCircleOutlined />}
                    >
                      Activate
                    </Button>
                  </Popconfirm>
                </>
              )}
            </>,
            
            
            i.gender,
            i.speed,
           
          
          )
        )
      : "",
  ];

  // console.log(data)
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Sound Information"
      subTitle="Sound Management"
     
    ></PageHeader>
  );


  

  return (
    <Content>
      {Pageheader}
      <Table
        columns={columns}
        dataSource={rows[0]}
        scroll={{ x: 1000 }}
        sticky
      />
      
      

      {/* {RemarksDelete} */}
    </Content>
  );
};

export default Sound;
