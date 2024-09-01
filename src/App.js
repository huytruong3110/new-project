import React, { Children, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  EditOutlined,
  DeleteOutlined, 
  InfoOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import axios from "axios";
import UserViewDetail from "./components/UserViewDetail";
import UserAddAndUpdate from "./components/UserAddAndUpdate";
const { Header, Sider, Content } = Layout;

const { Search } = Input;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "Ten",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{"Ten: " + text}</a>,
    },

    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
      
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      
    },
    
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
      
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      
    },
    
    {
      title: "Action",
      fixed: "right",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdateUser(record)}> 
            <EditOutlined /> 
          </a>
          <a onClick={() => handleDelete(record.id)}><DeleteOutlined style={{fontSize: 20}}/></a>
          <a><InfoOutlined /></a>
          <a onClick={() => handleViewDetail(record)}>
          <InfoCircleOutlined style={{fontSize: 20}} />
          </a>
          
        </Space>
      ),
    },
   
    
  ];
  
  const handleViewDetail = async (record) => {
    console.log("record", record);
    setModalProps({
      open: true,
      title: "Thong bao",
      children: <UserViewDetail record={record}></UserViewDetail>,
      onOk: async () => {
        setModalProps({ open: false});
      },
      onCancel: () => {
        setModalProps({ open: false});
      },
      footer: (
        <Button
          type="primary"
          onClick={() => {
            setModalProps({ open: false});
          }}
        >
          Dong
        </Button>
      )
      
      
    });
   }
   const handleUpdateUser = async (record) => {
    console.log("record", record);
    setModalProps({
      open: true,
      title: "Chinh sua",
      children: <UserAddAndUpdate record={record}></UserAddAndUpdate>,
      onOk: async () => {
        setModalProps({ open: false});
      },
      onCancel: () => {
        setModalProps({ open: false});
      },
      footer: (
        <Button
          type="primary"
          onClick={() => {
            setModalProps({ open: false});
          }}
        >
          Dong
        </Button>
      )
      
      
    });
   }
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalProps, setModalProps] = useState({});


  const fetchUsers = async (name) => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:8080/users/search?" +
        new URLSearchParams({
          name: name ?? "",
        }).toString()
    );
    const users = response?.data?.users || [];
    console.log("users", users);
    setUsers(users);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    console.log("delete", id);
    setModalProps({
      open: true,
      title: "Thong bao",
      
      children: <p>Ban co muon xoa ban ghi co id = {id} khong?</p>,
      onOk: async () => {
        const response = await axios.delete("http://localhost:8080/users/" + id);
       if (response.status === 200) {
        message.success("Xoa thanh cong");
        fetchUsers();
       }
       setModalProps({open: false});
      },
    });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Modal {...modalProps}></Modal>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Search placeholder="Tim kiem theo ten"
               style={{ width: 200 }} 
               onChange={(e) => {
                console.log("change", e.target.value);
                setSearchText(e.target.value);
               }}
                onSearch={() => {
                  console.log("search", searchText);
                  fetchUsers(searchText);
                }}
                />
              
               
            </Col>
            <Col xs={24}>
              <Table loading={loading} columns={columns} dataSource={users} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;