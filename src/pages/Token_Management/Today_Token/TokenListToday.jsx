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
  EyeOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { getTodayTokenList } from "../../../actions/token";
import history from "../../../history";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 15 },
};

const TokenListToday = () => {
  const [data, setData] = useState([]);
  const [docimg, setDocImg] = useState(false);
  const [uploadImageModal, setUploadimageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cvalue, setValue] = useState("");
  const [cname, setName] = useState("");
  const [csequence, setSequence] = useState("");
  const [ctype, setType] = useState("");
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  let tokenData = [];
  const fetchData = async () => {
    window.scrollTo(0, 0);
    const res = await getTodayTokenList();
    console.log(res);

    setData(res);
  };
  //  console.log(data,'data')

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

  const DeleteCategories = async (name) => {
    const code = await CategoriesDelete(name);
    if (code === 201) {
      handleRefresh();
    }
  };
  const handleVisible=async(token_no)=>{
    history.push(`/token-details-today?token_no=${token_no}`);
  }
  const onFinish = async (values) => {
    console.log(values);
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
    console.log(name, status);

    const code = await CategoriesStatusUpdate(name, status);
    console.log(code);
    if (code === 201) {
      handleRefresh();
    }
  };

  const onFinishEdit = async (value) => {
    // console.log('ss',value);

    const code = await EditCategories(cname, value);
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
      title: "Token Number",
      dataIndex: "id",
      key: "id",
      width: "15%",
      ...searchColumns("id"),
    },
    {
      title: "Token Id",
      dataIndex: "t_id",
      key: "t_id",
      width: "25%",
      ...searchColumns("t_id"),
    },
    {
      title: "Token Status",
      dataIndex: "token_status",
      key: "token_status",
      width: "20%",
      ...searchColumns("token_status"),
    },
    
    {
      title: "Create At",
      dataIndex: "create_at",
      key: "create_at",
      width: "20%",
      ...searchColumns("create_at"),
    },

    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      key: "action",
    },
  ];

  const createData = (id, t_id, token_status, create_at, action) => {
    return { id, t_id, token_status, create_at, action };
  };

  //  console.log(data.token,'token')
  const rows = [
    data
      ? data?.map((i) =>
          createData(
            i?.token_no,

            i?.token_id,
            i?.token_status,

            i?.create_at,

            <Button
              size="small"
              style={{ backgroundColor: "red", color: "#fff" }}
              icon={<EyeOutlined />}
              onClick={() => {handleVisible(i.token_no)}}
            >
              View
            </Button>
          )
        )
      : "",
  ];

  // console.log(data)
  const Pageheader = (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Today Token List"
      subTitle="Report Management"
      
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

export default TokenListToday;
