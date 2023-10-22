import React, { useEffect, useState } from "react";
import {
  NameCreate,
  getName,
  NameStatusUpdate,EditName,
  NameDelete,
} from "../../../actions/dekstopapp";

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
  Col,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  SearchOutlined,  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const Name = () => {
  const [data, setData] = useState("");
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [named, setNameD] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const fetchData=async()=>{
    window.scrollTo(0, 0);
    const res = await getName();
    console.log(res);
    setNameD(res.name)
    setData(res);
    
  }

  forms.setFieldsValue({
    name: named,
   
  });
  useEffect( () => {
    fetchData();

  

  
  }, []);

  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteImage = async (name) => {
    const code = await NameDelete(name);
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async (values) => {
    console.log(values)
    const code = await NameCreate(values);
    
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getName();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    // console.log(name, status);

    const code = await NameStatusUpdate(name, status);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const onFinishEdit = async (name) => {
    // console.log(name, status);

    const code = await EditName(name);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setEditModal(false);
      handleRefresh();
    }
  };

  // console.log(data)
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Name View"
      subTitle="Desktop App Management"
      extra={[
        data?
        <Button
          key="1"
          type="primary"
          disabled
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Company Name
        </Button>:
         <Button
         key="1"
         type="primary"
        
         icon={<PlusCircleFilled />}
         onClick={() => uploadImage()}
       >
         Add Company Name
       </Button>
        ,
      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Create Company Name"}
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
          <Form.Item name='name' label="Company name">
          <Input size="large" name='name' placeholder='Enter Name'  />
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
      title={"Edit Company Name"}
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
          <Form.Item name='name' label="Company name " rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Input size="large" name='name' placeholder='Enter Name'  />
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

  const DataShow = (
    <>
      <br></br>

     
        <Card
        
        title="Company Information"
        bordered={false}
        style={{
          width: "100%",
        
          textAlign:'center',
          
        }}
      
        >
            <Row>
        <Col xl={6} lg={6}>
          <p>
            {" "}
            Id 
          </p>
        </Col>
        <Col xl={6} lg={6}>
          <p>
            Name 
          </p>
        </Col>
        <Col xl={4} lg={4}>
          <h1>Status</h1>
        </Col>

        <Col xl={8} lg={8}>
          <h1>Action</h1>
        </Col>
        
        </Row>


             <Row>
        <Col xl={6} lg={6}>
          
            <strong>{data?.id}</strong>
          
        </Col>
        <Col xl={6} lg={6}>
           <strong>{data?.name}</strong>
         
        </Col>
        <Col xl={4} lg={4}>
          {data?.status == true ? (
            <>
              <Tag color="#87d068">Active</Tag>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleStatus(data?.name, false)}
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
                onConfirm={() => handleStatus(data?.name, true)}
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
        </Col>

        <Col xl={8} lg={8}>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => DeleteImage(data?.name)}
          >
            <Button size="small" type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          &nbsp;  &nbsp;
          
            <Button size="small" type="danger" icon={<EditOutlined />} onClick={() => {setEditModal(true)}}>
              Edit
            </Button>
          
        </Col>
        
        </Row>
        </Card>
     
    </>
  );

  return (
    <Content>
      {Pageheader}
      {DataShow}
      {MODAL}
      {EditMODAL}
      

      {/* {RemarksDelete} */}
    </Content>
  );
};

export default Name;
