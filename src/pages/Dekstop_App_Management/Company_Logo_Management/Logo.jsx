import React, { useEffect, useState } from "react";
import {
  LogoDelete,
  LogoStatusUpdate,
  UploadLogosp,
  getLogo,
} from "../../../actions/dekstopapp";

import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  PageHeader,
  Popconfirm,
  Row,
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

const Logo = () => {
  const [data, setData] = useState("");
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [named, setNameD] = useState("");
  const [form] = Form.useForm();
  const fetchData = async () => {
    window.scrollTo(0, 0);
    const res = await getLogo();
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = () => {
    setUploadimageModal(true);
  };

  const DeleteImage = async (name) => {
    const code = await LogoDelete(name);
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinish = async () => {
    const code = await UploadLogosp(docimg);

    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    const res = await getLogo();
    setData(res);
    form.resetFields();
  };

  const handleStatus = async (name, status) => {
    // console.log(name, status);

    const code = await LogoStatusUpdate(name, status);
    // console.log(code)
    if (code === 201) {
      form.resetFields();

      setUploadimageModal(false);
      handleRefresh();
    }
  };

  console.log();
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Logo View"
      subTitle="Desktop App Management"
      extra={[
        data ? (
          <Button
            key="1"
            type="primary"
            disabled
            icon={<PlusCircleFilled />}
            onClick={() => uploadImage()}
          >
            Upload Logo
          </Button>
        ) : (
          <Button
            key="1"
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => uploadImage()}
          >
            Upload Logo
          </Button>
        ),
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
          <Form.Item
            label="Image of App"
            rules={[
              {
                required: true,
                message: "This field is required!!",
              },
            ]}
          >
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
        title="Logo"
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
          src={`http://192.168.0.143:8001/dekstop/logo/read/${named}`}
          style={{ margin: "1rem", width: "700px" }}
          alt="Tv App image"
        />
      </Modal>
    </>
  );
  const DataShow = (
    <>
      <br></br>

      <Row>
        <Col xl={8} lg={12}>
          <Card
            title="Logo Information"
            bordered={false}
            style={{
              width: "300",

              textAlign: "center",
              maxHeight: 250,
              minHeight: 250,
            }}
          >
            <p>
              {" "}
              Id : <strong>{data?.id}</strong>
            </p>
            <p>
              Name : <strong>{data?.name}</strong>
            </p>
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
          </Card>
        </Col>

        <Col xl={8} lg={12}>
          <Card
            title="Logo"
            bordered={false}
            style={{
              width: "300",

              textAlign: "center",
              maxHeight: 250,
              minHeight: 250,
            }}
          >
            {data?.name ? (
              <img
                onClick={() => {
                  setIsModalVisible(true);
                  setNameD(data?.name);
                }}
                src={`http://192.168.0.143:8001/dekstop/logo/read/${data?.name}`}
                width="230px"
                height="100px"
                alt=""
              />
            ) : (
              <img src="/noimageav.jpg" width="230px" height="100px" alt="" />
            )}
            {/* {PICMODAL} */}
          </Card>
          <br></br>
        </Col>
        <Col xl={8} lg={12}>
          <Card
            title="Action"
            bordered={false}
            style={{
              width: "300",

              textAlign: "center",
              maxHeight: 250,
              minHeight: 250,

              // float:'right'
            }}
          >
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
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <Content>
      {Pageheader}
      {DataShow}
      {MODAL}
      {PICMODAL}

      {/* {RemarksDelete} */}
    </Content>
  );
};

export default Logo;
