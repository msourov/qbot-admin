import React, { useEffect, useState } from "react";
import {

  getDekstopList,
  DekstopStatusUpdate,
  DekstopOptionDelete,DekstopOptionCreate,EditDekstopName
} from "../../../actions/dekstopapp";


import {
  Table,
  Input,
  Button,
  PageHeader,
  Popconfirm,
  Tag,
  Form,
  Modal,Select
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,

  PlusCircleFilled,EditOutlined,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span:15 },
};

const DekstopList = () => {
  const [data, setData] = useState([]);
  const [datacheck, setDatacheck] = useState([]);
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [named, setNameD] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();

  async function fetchData() {
    
    window.scrollTo(0, 0);
    const res = await getDekstopList();
    
    setData(res?.data);
    setDatacheck(res)
    
  }
  useEffect( () => {
    
    fetchData();
    
  }, []);
  forms.setFieldsValue({
    name: named,
   
  });
  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteImage = async (name) => {
    
     
      const code = await DekstopOptionDelete(name);
      if (code === 201) {


        handleRefresh()
      }
    
  };
  // console.log(datacheck)

  const onFinish = async (values)  => {
    

    const code = await DekstopOptionCreate(values);
    
  
    if (code === 201) {
      form.resetFields();
    
      
      
      setUploadimageModal(false)
      handleRefresh()
    }
  };
  console.log(named);
  const onFinishEdit = async (name) => {
    console.log(named);

    const code = await EditDekstopName(named,name);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setEditModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => { 
    const res = await getDekstopList();
    setData(res?.data);
    setDatacheck(res)
    form.resetFields();
  };
  console.log(data)

  const handleStatus = async (name, status) => {
    // console.log(name, status);

    const code = await DekstopStatusUpdate(name, status);
    // console.log(code)
    if (code === 201) {
      form.resetFields();
    
      
      
      setUploadimageModal(false)
      handleRefresh()
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...searchColumns("name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "25%",
      ...searchColumns("status"),
    },
    {
      title: "Categories ",
      dataIndex: "catagories",
      key: "catagories",
      width: "20%",
      ...searchColumns("catagories"),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      key: "action",
    },
  ];
 
  const createData = (id, name, status, catagories, action) => {
    return { id, name, status, catagories, action };
  };
 
 
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            i?.name,
            <>
              {i?.status ? (
                <>
                  <Tag color="#87d068">Active</Tag>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleStatus(i?.name, false)}
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
                    onConfirm={() => handleStatus(i?.name, true)}
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
            i?.categories,
            <>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => DeleteImage(i?.name)}
              >
                <Button size="small" type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
              &nbsp;
              <Button size="small" type="danger" icon={<EditOutlined />} onClick={()=>{setEditModal(true);setNameD(i?.name)}}>
                  Edit
                </Button>
            </>
          )
        )
      : "",
  ];
console.log(datacheck?.mandatory ===1 && datacheck?.single===1 && datacheck?.normal===1)
console.log(datacheck?.mandatory )
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Dekstop Option List"
      subTitle="Dekstop App Management"
      extra={[
        
          datacheck?.mandatory ===1 && datacheck?.single===1 && datacheck?.normal===1 ?
        
        <Button
          key="1"
          type="primary"
          disabled
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Dekstop Option
        </Button>:<Button
          key="1"
          type="primary"
          

          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Dekstop Option
        </Button>

      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Add Dekstop Option"}
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
          <Form.Item name='name' label="Name " rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]} >
          <Input size="large" name='name' placeholder='Enter Name'   />
          </Form.Item>
          <Form.Item name='value' label="Value " rules={[
          {
            required: true,
            message: 'This field is required!',
          },
        ]} >
          <Input size="large" name='value' placeholder='Enter value'  />
          </Form.Item>
          <Form.Item name='categories' label="categories " rules={[
          {
            required: true,
            message: 'This field is required!!',
          },
        ]}>
          <Select placeholder="Select One" size="large"  >
            {
              datacheck.mandatory===1?
              <Option value='mandatory' disabled >Mandatory</Option>:
              <Option value='mandatory' >Mandatory</Option>
            }
            {
              datacheck.normal===1?
              <Option value='normal' disabled >Normal</Option>:
              <Option value='normal' >Normal</Option>
            }
            {
              datacheck.single===1?
              <Option value='single' disabled >Single</Option>:
              <Option value='single' >Single</Option>
            }
           
            
            
            
          </Select>
          </Form.Item>
          {/* <Form.Item name='status' label="Status "> */}
          {/* <Select placeholder="Select One" size="large"  >
           
           <Option value='true' >Active</Option>
           <Option value='false' >Inactive</Option>
           
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
  const EditMODAL = (
    <Modal
    title={"Edit Dekstop Option Name"}
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
        <Form.Item name='name' label="Dekstop Name">
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

export default DekstopList;
