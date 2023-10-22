import React, { useEffect, useState } from "react";
import {
    getUserList,UpdatePassword,UserStatusUpdate,StaffStatusUpdate,UserDelete, UserCreate, getUserByName, EditUser, EditUserCategory
} from "../../../actions/user";

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
  SearchOutlined,  EditOutlined,EyeOutlined,SettingOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { getCategoriesListUser } from "../../../actions/categories";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const UserList = () => {
  const [data, setData] = useState("");
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [named, setNameD] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const [passsfrms] = Form.useForm();
  const [categorieslist, setCategoriesList] = useState("");
  const [countertype, setCounterType] = useState("");
  
  const fetchData=async()=>{
    window.scrollTo(0, 0);
    const res = await getUserList();

    // console.log(res1,'list')

    // console.log(res);
    setData(res);
    
    
  }
  const fetchData1=async()=>{
    
    const res1= await getCategoriesListUser();
    setCategoriesList(res1)

    console.log(res1,'list')

    // console.log(res);
   
    
   
  }

  useEffect( () => {
    fetchData();
    fetchData1();
    
  }, []);

  const getIndivualUser=async(name)=>{
    // console.log(name);
    const res=await getUserByName(name);
    // console.log(res,'user')
     


    
    
    forms.setFieldsValue({

      username : res?.username,
      email:res?.email,
    
      
     
    counter_name:res?.counter_name}
    )
  }

  const uploadImage = () => {
    setUploadimageModal(true);
    
  };

  const DeleteImage = async (name) => {
    // console.log(name)
    const code = await UserDelete(name)
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async (values) => {
    // console.log(values)
    const code = await UserCreate(values);
    
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };
  const onFinishUpdateCategory = async (values) => {
    // console.log(values)
    const code = await EditUserCategory(named,values);
    
    if (code === 201) {
      form.resetFields();

      setCategoryModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getUserList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (username,is_active) => {
    console.log( username,is_active,"pic");
    // console.log(named,'mak');

    const code = await UserStatusUpdate(username,is_active);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };


  // const option=(
  //   categorieslist?.map(item => (
  //     <Option value={item.value}>{item.name}</Option>
  // ))
  // )
  const handleStatusStaff = async (username,is_active) => {
    console.log( username,is_active,"pic");
    // console.log(named,'mak');

    const code = await StaffStatusUpdate(username,is_active);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const onFinishEdit = async (values) => {
    console.log(named, values);

    const code = await EditUser(named,values)
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setEditModal(false);
      setPassModal(false)

      handleRefresh();
    }
  };
  // console.log(named);
  const onFinishPass = async (values) => {
    console.log(named, values);

    const code = await UpdatePassword(named,values)
    // console.log(code)
    if (code === 201) {
     
      setPassModal(false)
      passsfrms.resetFields();
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
      width: "15%",
      ...searchColumns("name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...searchColumns("status"),
    },
    {
      title: "Staff",
      dataIndex: "is_staff",
      key: "is_staff",
      width: "30%",
      ...searchColumns("is_staff"),
    },
    {
      title: "Categories ",
      dataIndex: "counter_categories",
      key: "counter_categories",
      width: "20%",
      ...searchColumns("counter_categories"),
    },
    {
      title: "Counter Name ",
      dataIndex: "counter_name",
      key: "counter_name",
      width: "15%",
      ...searchColumns("counter_name"),
    },
    {
      title: "Counter No ",
      dataIndex: "counter_no",
      key: "counter_no",
      width: "15%",
      ...searchColumns("counter_no"),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "30%",
      key: "action",
    },
  ];
 
  const createData = (id, name, status,is_staff, counter_categories,counter_name,counter_no, action) => {
    return { id, name, status,is_staff, counter_categories,counter_name,counter_no,  action };
  };
 
 
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            i?.username,
            <>
              {i?.is_active ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.username, false)}
                  >
                    <Button size="small" type="danger" icon={<StopOutlined />}>
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
                    onConfirm={() => handleStatus(i?.username, true)}
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
            <>
              {i?.is_staff ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatusStaff(i?.username, false)}
                  >
                    <Button size="small" type="danger" icon={<StopOutlined />}>
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
                    onConfirm={() => handleStatusStaff(i?.username, true)}
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
            <>
             {i.counter_categories}&nbsp;&nbsp;&nbsp;&nbsp;
            <EditOutlined style={{color:'red'}} onClick={()=>{setCategoryModal(true);setNameD(i?.username)}} />
            </>
           ,
            i.counter_name,
            i?.counter_no,
            <>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => DeleteImage(i?.username)}
              >
                <Button size="small" type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
              &nbsp;

              <Button size="small"  icon={<EditOutlined />}  style={{backgroundColor:'#ff7d26', color:'#fff'}}  onClick={()=>{setEditModal(true);setNameD(i?.username); getIndivualUser(i?.username)}}>
                  Edit
                </Button>
             
              
              <br />
              <br />
              <Button
                size="small"
                type="primary"
                icon={<SettingOutlined />}
                onClick={()=>{setPassModal(true);setNameD(i?.username)}}
              >
                Change Password
              </Button>
              &nbsp;
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
      title="User List"
      subTitle="User Management"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add User
        </Button>,
      ]}
    ></PageHeader>
  );

  const AddModal=(
    <Modal
    title={"Add User"}
      centered
      visible={uploadImageModal}
      width={800}
      onCancel={() => {
        setUploadimageModal(false);
      }}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
          name="add_user"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailedEdit}
          style={{
            alignSelf: "center",
            // boxShadow: "0px 2px 4px 2px rgba(0,0,0,0.64)",
            backgroundColor: "#fff",
          }}
          requiredMark={false}
          form={form}
        >
               <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "This Field is required",
              },
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Input
              placeholder="This Field is required"
              //   size="large"
              
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "This Field is required",
              },
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Input
              type="password"
              placeholder="This Field is required"
              //   size="large"
              
            />
          </Form.Item>
          <Form.Item
            label="Email   "
            name="email"
            rules={[
              {
                required: true,
                message: "This Field is required",
              },
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Input
              placeholder="This Field is required"
              //   size="large"
              
            />
          </Form.Item>
          <Form.Item
            label="Counter Name   "
            name="counter_name"
            rules={[
              {
                required: true,
                message: "Ex :Counter 1 is required",
              },
              
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Input
              placeholder="This Field is required"
              //   size="large"
              
            />
          </Form.Item>
          <Form.Item
            label="Counter No   "
            name="counter_no"
            rules={[
              {
                required: true,
                message: "Ex :1 is required",
              },
              {
                message: "Please valid counter no!",
              },
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Input
              placeholder="This Field is required"
              //   size="large"
            
            />
          </Form.Item>
          <Form.Item
            name="counter_categories"
            label="Counter Type"
            rules={[
              {
                required: true,
                message: "Ex :REGISTRATION is required",
              },
            ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Select
              showSearch
              placeholder="Select One"
              // size="large"
              onChange={(e) => {
                setCounterType(e);
              }}
              
            >
              { categorieslist?
              categorieslist?.map(item => 
                    <Option value={item.value}>{item.name}</Option>
                ):null}
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          {countertype === "admin" ? (
            <Form.Item
              name="is_staff"
              label="Staff Type"
              // rules={[
              //     {
              //       required: true,
              //       message: "Field is required",
              //     },
              //   ]}
              style={{ alignSelf: "center", width: "100%" }}
            >
              <Select
                showSearch
                placeholder="Select One"
                // size="large"
                
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </Form.Item>
          ) : null}

          <Form.Item
            name="is_active"
            label="Active Type"
            // rules={[
            //     {
            //       required: true,
            //       message: "Field is required",
            //     },
            //   ]}
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Select
              showSearch
              placeholder="Select One"
              // size="large"
             
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "150px",
                marginLeft: "350px",
              }}
            >
              Done
            </Button>
          </Form.Item>

      </Form>
      
    </Modal>
   


  );

 

  const EditMODAL = (
    <Modal
      title={"Edit User Information"}
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
          <Form.Item  name='username'  label="Name ">
          <Input disabled size="large" name='username' placeholder='Enter name'  />
          </Form.Item>
          <Form.Item name='email' label="Email ">
          <Input size="large" name='email' placeholder='Enter email'  />
          </Form.Item>
          
          <Form.Item name='counter_name' label="Counter Name">
          <Input size="large" name='counter_name' placeholder='Enter Counter Name'  />
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

  const PASSWORDMODAL = (
    <Modal
      title={"Password Change"}
      centered
      visible={passModal}
      width={800}
      onCancel={() => {
        setPassModal(false);
      }}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
    >
      <>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishPass}
          // onFinishFailed={onFinishFailed}
          form={passsfrms}
        >
          <Form.Item name='password' label="Enter New Password ">
          <Input size="large" name='password' placeholder='Eenter Password'  />
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

  const CategoryModal=(
    <Modal
      title={"Category Edit"}
      centered
      visible={categoryModal}
      width={800}
      onCancel={() => {
        setCategoryModal(false);
      }}
      cancelText="Close"
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
      {...layout}
      name="basic_category"
      initialValues={{ remember: true }}
      onFinish={onFinishUpdateCategory}
      // onFinishFailed={onFinishFailed}
      form={forms}
      >
      <Form.Item
            name="counter_categories"
            label="Counter Type"
            
            style={{ alignSelf: "center", width: "100%" }}
          >
            <Select
              showSearch
              placeholder="Select One"
              // size="large"
              onChange={(e) => {
                setCounterType(e);
              }}
              
            >
              { categorieslist?
              categorieslist?.map(item => 
                    <Option value={item.value}>{item.name}</Option>
                ):null}
             
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
      </Form>

    </Modal>
  )
  

  return (
    <Content>
      {Pageheader}
      <Table
        columns={columns}
        dataSource={rows[0]}
        scroll={{ x: 1000 }}
        sticky
      />
      {CategoryModal}
      {EditMODAL}
      {AddModal}
      {PASSWORDMODAL}

  
    </Content>
  );
};

export default UserList;
