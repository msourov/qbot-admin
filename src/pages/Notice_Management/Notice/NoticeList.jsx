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
  SearchOutlined,  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { getNoticeList ,NoticeStatusUpdate,NoticeDelete, getUserCategoriesList, getUserCounterList, NoticeCreate} from "../../../actions/notice";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const NoticeList = () => {
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
    const res = await getNoticeList();
    const res1= await getUserCategoriesList();
    // console.log(res);
    setCategoriesList(res1)
    setData(res);
  }

  useEffect( () => {
    fetchData()
    
  }, []);
  forms.setFieldsValue({
    name: cname,
    value: cvalue,
    sequence: csequence,
    categories_type: ctype,
   
  });

  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteCategories = async (name) => {
    const code = await NoticeDelete(name)
    if (code === 201) {
      handleRefresh();
    }
  };
// console.log(countertype)
  const onFinish = async (values) => {
    console.log(values)
    const code = await NoticeCreate(types,values);
    console.log(code)
    if (code === 201) {
      form.resetFields();
      setTypes(false)

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getNoticeList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    
    console.log(name, status);

    const code =await NoticeStatusUpdate(name, status)
    console.log(code)
    if (code === 201) {
      

      
      handleRefresh();
    }
  };

  const onFinishEdit = async (value) => {
    // console.log('ss',value);

    const code = 201
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setEditModal(false);
      handleRefresh();
    }
  };
  const onCounterList = async (value) => {
    // console.log('ss',value);

    const res = await getUserCounterList(value);
    console.log(res)
    setCounterData(res)

    // if (code === 20) {
    //   form.resetFields();

    //   setEditModal(false);
    //   handleRefresh();
    // }
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
      width: "10%",
      ...searchColumns("id"),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: "15%",
      ...searchColumns("categories"),
    },
    {
      title: "Counter No",
      dataIndex: "counter_no",
      key: "counter_no",
      width: "15%",
      ...searchColumns("counter_no"),
    },
    {
      title: "Notice ",
      dataIndex: "notice",
      key: "notice",
      width: "35%",
      ...searchColumns("notice"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "25%",
      ...searchColumns("status"),
    },
    
    {
      title: "Create At ",
      dataIndex: "create_at",
      key: "create_at",
      width: "15%",
      ...searchColumns("create_at"),
    },
    
    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      key: "action",
    },
  ];
 
  const createData = (id, categories,counter_no,notice, status, create_at, action) => {
    return { id, categories,counter_no, status,notice, create_at,  action };
  };
 
 
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            
                i?.categories===null?
                <p>All</p>:
                i?.categories

            ,
            
            i?.counter_no===null?
            <p>All</p>:
            i?.counter_no
            ,
            i?.value,
            <>
              {i?.status ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.id, false)}
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
                    onConfirm={() => handleStatus(i?.id, true)}
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
            
            
            i.create_at,
           
            <>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => DeleteCategories(i?.id)}
              >
                <Button size="small" type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>&nbsp;
              
                {/* <Button size="small" style={{backgroundColor:'#ff7d26', color:'#fff'}} icon={<EditOutlined />} onClick={() =>{ setEditModal(true);setName(i?.mac_no);}}>
                  Edit
                </Button> */}
             
            </>
          )
        )
      : "",
  ];

  // console.log(data)
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Notice List"
      subTitle="Notice Management"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Notice 
        </Button>,
      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Add Notice"}
      centered
      visible={uploadImageModal}
      width={800}
      onCancel={() => {
        setUploadimageModal(false);
      }}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
    >
      <>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          form={form}
        >
            <Form.Item name='base' label="Notice Type " rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}> 
          <Select placeholder="Select One" size="large" onChange={(e)=>{setTypes(e)}}  >
           
           <Option value='all' >All</Option>
           <Option value='select' >Individual</Option>
           
         </Select>
        
          </Form.Item>
          {
            types==="all"?
            <>
            <Form.Item name='value' label="Notice" rules={[
                {
                  required: true,
                  message: 'This field is required!!',
                },
              ]}>
                <Input size="large" name='notice ' placeholder='Enter Notice'  />
                </Form.Item>
                
              <Form.Item name='status' label="Status " rules={[
                {
                  required: true,
                  message: 'This field is required!!',
                },
              ]}> 
                <Select placeholder="Select One" size="large"  >
                 
                 <Option value='true' >Active</Option>
                 <Option value='false' >Inactive</Option>
                 
               </Select>
                </Form.Item>
              </> :types==="select"?
              <>
               <Form.Item name='value' label="Notice" rules={[
                {
                  required: true,
                  message: 'This field is required!!',
                },
              ]}>
                <Input size="large" name='notice ' placeholder='Enter Notice'  />
                </Form.Item>
                
              <Form.Item name='categories' label="Categories " rules={[
                {
                  required: true,
                  message: 'This field is required!!',
                },
              ]}> 
                <Select placeholder="Select One" size="large"    onChange={(e) => {
                setCounterType(e);
               
                
              }}  

            
              
              
              >
                { categorieslists?
              categorieslists?.map(item => 
                    <Option value={item.value}>{item.Name}</Option>
                ):null}
                 
                 
               </Select>
                </Form.Item>
                <Tag style={{marginLeft:"12rem",marginBottom:'20px'}} color="#872C2C">After Select Categories Please Click Done</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {onCounterList( countertype);setCState(true)}}
                  >
                    <Button
                      size="small"
                      type="primary"
                      
                    >
                      Done
                    </Button>
                  </Popconfirm>
                 {/* { console.log(countertype)} */}
{
  Cstate===false ?
  <Form.Item name='counter_no' label="Counter No "  disable rules={[
    {
      required: true,
      message: 'This field is required!!',
    },
  ]}> 
    
    </Form.Item>:
  <Form.Item name='counter_no' label="Counter No " rules={[
    {
      required: true,
      message: 'This field is required!!',
    },
  ]}> 
    <Select placeholder="Select One" size="large"  >
     
    { counterdata?
              counterdata?.map(item => 
                    <Option value={item.counter_no}>{item.counter_no}</Option>
                ):null}
     
   </Select>
    </Form.Item>
 
}
              
              <Form.Item name='status' label="Status " rules={[
                {
                  required: true,
                  message: 'This field is required!!',
                },
              ]}> 
                <Select placeholder="Select One" size="large"  >
                 
                 <Option value='true' >Active</Option>
                 <Option value='false' >Inactive</Option>
                 
               </Select>
                </Form.Item>
              </>:null
               
            
         }
         

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
  const EditMODAL = (
    <Modal
      title={"Edit Categories"}
      centered
      visible={editModal}
      width={800}
      onCancel={() => {
        setEditModal(false);
      }}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
    >
      <>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishEdit}
          // onFinishFailed={onFinishFailed}
          form={forms}
        >
         <Form.Item name='name' label="name">
          <Input size="large" name='name' placeholder='x-ray'  />
          </Form.Item>
          <Form.Item name='value' label="Value">
          <Input size="large" name='value' placeholder='xray'  />
          </Form.Item>
          <Form.Item name='sequence' label="Sequence">
          <Input size="large" name='sequence' placeholder='1-2-3'  />
          </Form.Item>
        
        <Form.Item name='categories_type' label="Type "> 
          <Select placeholder="Select One" size="large"  >
           
           <Option value='single' >Others</Option>
           <Option value='normal' >Selectable</Option>
           <Option value='mandatory' >Mandatory</Option>
           
         </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    </Modal>
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
      {MODAL}
      {EditMODAL}
      

      {/* {RemarksDelete} */}
    </Content>
  );
};

export default NoticeList;
