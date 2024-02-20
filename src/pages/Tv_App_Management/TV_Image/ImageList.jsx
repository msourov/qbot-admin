import React, { useEffect, useState } from "react";
import {
  ImageDelete,
  ImageStatusUpdate,
  UploadImagesp,
  getImageList,
} from "../../../actions/tvapp";

import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  PageHeader,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import { Content } from "antd/lib/layout/layout";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const ImageList = () => {
  const [data, setData] = useState([]);
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [named, setNameD] = useState("");
  const [form] = Form.useForm();
  async function fetchData() {
    window.scrollTo(0, 0);
    const res = await getImageList();
    setData(res);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteImage = async (name) => {
    const code = await ImageDelete(name);
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async () => {
    const code = await UploadImagesp(docimg);

    if (code === 201) {
      form.resetFields();
      // form.setFieldsValue({
      //   upload_file:''
      // })

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getImageList();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    // console.log(name, status);

    const code = await ImageStatusUpdate(name, status);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
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
      title: "Image ",
      dataIndex: "image",
      key: "image",
      width: "20%",
      ...searchColumns("image"),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      key: "action",
    },
  ];

  const createData = (id, name, status, image, action) => {
    return { id, name, status, image, action };
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
            i.name ? (
              <>
                <img
                  onClick={() => {
                    setIsModalVisible(true);
                    setNameD(i?.name);
                  }}
                  src={`http://192.168.0.143:8001/app/read/${i?.name}`}
                  width="40px"
                  height="40px"
                  alt=""
                />
                {/* {PICMODAL} */}
              </>
            ) : (
              <img src="/noimageav.jpg" width="40px" height="40px" alt="" />
            ),
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
            </>
          )
        )
      : "",
  ];
  // console.log(named)
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Image List"
      subTitle="Tv App Management"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => uploadImage()}
        >
          Upload Image
        </Button>,
      ]}
    ></PageHeader>
  );

  const MODAL = (
    <Modal
      title={"Upload Image"}
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
          <Form.Item label="Image of App">
            <input
              type="file"
              id="avatar"
              name="upload_file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setDocImg(e.target.files[0]);
              }}
            ></input>
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
  const PICMODAL = (
    <>
      <Modal
        title="App Image"
        visible={isModalVisible}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={800}
      >
        <img
          onClick={() => {
            setIsModalVisible(true);
          }}
          src={`http://192.168.0.143:8001/app/read/${named}`}
          style={{ margin: "1rem", width: "700px" }}
          alt="Tv App image"
        />
      </Modal>
    </>
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
      {PICMODAL}

      {/* {RemarksDelete} */}
    </Content>
  );
};

export default ImageList;
