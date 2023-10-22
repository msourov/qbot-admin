import React, { useEffect, useState } from "react";
import {
    getDisplayList, DisplayStatusUpdate, DisplayDelete, DisplayCreate, getIndiviualDisplayList, DisplayEdit
} from "../../../actions/display";

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
import { getCategoriesList } from "../../../actions/categories";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const DisplayList = () => {
  const [data, setData] = useState("");
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cvalue, setValue] = useState("");
  const [cname, setName] = useState("");
  const [csequence, setSequence] = useState("");
  const [reqData, setReqData] = useState(null);
  const [countercategories, setCounterCategories] = useState("");
  const [ctype, setType] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();

  const fetchData=async()=>{
    window.scrollTo(0, 0);
    const res = await getDisplayList();
    const res1 = await getCategoriesList();
  
    // console.log(res1);
    setData(res);
    setCounterCategories(res1);
  }
  console.log(data,'data')
  
  const getIndivualDisplay=async(mac)=>{
    console.log(mac,'mac');
    const res=await getIndiviualDisplayList(mac);
    console.log(res,'user')
     


    
    
    forms.setFieldsValue({
      name_show: res?.name_show,
      
      mac_no: res?.mac_no,
      
     
    });
  }
  useEffect( () => {
    fetchData()
    
  }, []);
 

  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteCategories = async (name) => {
    const code = await DisplayDelete(name)
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async (values) => {
    console.log(values)
    const code = await DisplayCreate(values)
    
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getDisplayList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    
    // console.log(name, status);

    const code =await DisplayStatusUpdate(name, status)
    console.log(code)
    if (code === 201) {
      

      
      handleRefresh();
    }
  };

  const onFinishEdit = async (value) => {
    console.log('ss',value);

    const code = await DisplayEdit(value)
    console.log(code)
    if (code === 201) {
      form.resetFields();

      setEditModal(false);
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
      width: "10%",
      ...searchColumns("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...searchColumns("name"),
    },
    {
      title: "Mac Number",
      dataIndex: "mak",
      key: "mak",
      width: "20%",
      ...searchColumns("mak"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...searchColumns("status"),
    },
    
    {
      title: "Categories ",
      dataIndex: "categories",
      key: "categories",
      width: "15%",
      ...searchColumns("categories"),
    },
    
    {
      title: "Action",
      dataIndex: "action",
      width: "25%",
      key: "action",
    },
  ];
 
  const createData = (id, name,mak, status, categories, action) => {
    return { id, name,mak, status, categories,  action };
  };
 
 
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            i?.name_show,
            i?.mac_no,
            <>
              {i?.status ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.mac_no, false)}
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
                    onConfirm={() => handleStatus(i?.mac_no, true)}
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
            
            
            i.counter_categories,
           
            <>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => DeleteCategories(i?.mac_no)}
              >
                <Button size="small" type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>&nbsp;
              
                <Button size="small" style={{backgroundColor:'#ff7d26', color:'#fff'}} icon={<EditOutlined />} onClick={() =>{ setEditModal(true);setName(i?.mac_no); getIndivualDisplay(i?.mac_no)}}>
                  Edit
                </Button>
             
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
      title="Display List"
      subTitle="Display Management"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Display 
        </Button>,
      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Add Display"}
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
          <Form.Item name='name_show' label="Name" rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Input size="large" name='name_show' placeholder='Enter Name'  />
          </Form.Item>
          
          <Form.Item name='counter_categories' label="Select Categories" rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Select
              showSearch
              placeholder="Select One"
              // size="large"
            
              onChange={(e) => {
                setReqData(e);
              }}
              
            >
             
             
              { countercategories?
              countercategories?.map(item => 

                  <Option value={item.value}>{item.name}</Option>

                ):null}
             
          
            
              
            </Select>
          </Form.Item>
          <Form.Item name='mac_no' label="Mac Number" rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Input size="large" name='mac_no' placeholder='Enter Sequence'  />
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
          <Form.Item name='mac_no' label="Mac Number" hidden={true}
        >
          <Input size="large" name='mac_no' placeholder='Enter Sequence'  />
          </Form.Item>
         <Form.Item name='name_show' label="Name" rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Input size="large" name='name_show' placeholder='Enter Name'  />
          </Form.Item>
          
          {/* <Form.Item name='counter_categories' label="Select Categories" rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Select
              showSearch
              placeholder="Select One"
              // size="large"
            
              onChange={(e) => {
                setReqData(e);
              }}
              
            >
             
             
              { countercategories?
              countercategories?.map(item => 

                  <Option value={item.value}>{item.name}</Option>

                ):null}
             
          
            
              
            </Select>
          </Form.Item> */}
          

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

export default DisplayList;
