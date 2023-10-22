import React, { useEffect, useState } from "react";
import {
  EditCategories,
  getCategoriesList,
  CategoriesStatusUpdate,
  CategoriesDelete,
  CategoriesCreate,
} from "../../../actions/categories";

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
  Select,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  SearchOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const CategoriesList = () => {
  const [data, setData] = useState("");
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cvalue, setValue] = useState("");
  const [cname, setName] = useState("");
  const [ids, setIds] = useState("");
  const [csequence, setSequence] = useState("");
  const [ctype, setType] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();

  const fetchData = async () => {
    window.scrollTo(0, 0);
    const res = await getCategoriesList();
    // console.log(res);
    setData(res);
  };

  useEffect(() => {
    fetchData();
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

  const DeleteCategories = async (id) => {
    const code = await CategoriesDelete(id);
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async (values) => {
    // console.log(values);
    const code = await CategoriesCreate(values);

    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getCategoriesList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    // console.log(name, status);

    const code = await CategoriesStatusUpdate(name, status);
    // console.log(code)
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinishEdit = async (value) => {
    // console.log('ss',value, cname);

    const code = await EditCategories(ids, value);
    // console.log(code)
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
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "20%",
      ...searchColumns("value"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      ...searchColumns("status"),
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      width: "15%",
      ...searchColumns("sequence"),
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

  const createData = (
    id,
    name,
    value,
    status,
    sequence,
    categories,
    action
  ) => {
    return { id, name, value, status, sequence, categories, action };
  };

  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.id,
            i?.name,
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
            i?.sequence,

            i.categories_type,

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
              </Popconfirm>
              &nbsp;
              <Button
                size="small"
                style={{ backgroundColor: "#ff7d26", color: "#fff" }}
                icon={<EditOutlined />}
                onClick={() => {
                  setEditModal(true);
                  setName(i?.name);
                  setIds(i?.id);
                  setValue(i?.value);
                  setSequence(i?.sequence);
                  setType(i?.categories_type);
                }}
              >
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
      title="Categories List"
      subTitle="Category Management"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Add Category
        </Button>,
      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Add Category"}
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
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
            ]}
          >
            <Input size="large" name="name" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
              {
                pattern: new RegExp(/^.{1,4}$/),
                message: "Maximun length 4 ",
              },
            ]}
          >
            <Input size="large" name="value" placeholder="Enter Value" />
          </Form.Item>
          <Form.Item
            name="sequence"
            label="Sequence"
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
            ]}
          >
            <Input size="large" name="sequence" placeholder="Enter Sequence" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status "
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
            ]}
          >
            <Select placeholder="Select One" size="large">
              <Option value="true">Active</Option>
              <Option value="false">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="categories_type"
            label="Type "
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
            ]}
          >
            <Select placeholder="Select One" size="large">
              <Option value="single">Others</Option>
              <Option value="normal">Selectable</Option>
              <Option value="mandatory">Mandatory</Option>
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
          <Form.Item name="name" label="name">
            <Input size="large" name="name" placeholder="x-ray" />
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input size="large" name="value" placeholder="xray" />
          </Form.Item>
          <Form.Item name="sequence" label="Sequence">
            <Input size="large" name="sequence" placeholder="1-2-3" />
          </Form.Item>

          <Form.Item name="categories_type" label="Type ">
            <Select placeholder="Select One" size="large">
              <Option value="single">Others</Option>
              <Option value="normal">Selectable</Option>
              <Option value="mandatory">Mandatory</Option>
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

export default CategoriesList;
