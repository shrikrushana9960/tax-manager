import React,{useState,useEffect} from 'react'
import { Layout,List, Typography, Divider,Button,Table,Tag,Space,Select,Form,Input,message } from 'antd';
import { useHistory } from "react-router-dom";

const AdminBoard = () => {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const { Option } = Select;
  const { Title } = Typography;
  const { Content, Header } = Layout;
  const [taxpayer, setTaxPayer] = React.useState([]);
  const [taxAccoutant,setTaxAccoutant]=React.useState([]);
  React.useEffect(() => {
    
    const getData = async () => {
      fetch("/taxAccountants")
        .then((res) => {
          if (res.status === 200) {
          } else {
            throw new Error(res.error);
          }
          return res.json();
        })
        .then((res) => {
          setTaxAccoutant(res);
        })
        .catch((err) => {
          console.error(err);
          message.error("Error  in  Data please try again");
        });
    };
    getData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "totaltax",
      dataIndex: "totaltax",
      key: "totaltax",
    },
    {
      title: "lastdate",
      dataIndex: "lastdate",
      key: "lastdate",
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color={status === "paid" ? "green" : "red"} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.id}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data2 = [
    {
      id: 1,
      name: "John Brown",
      totaltax: 3200,
      lastdate: "10-sep-2020",
      status: "paid",
    },
    {
      id: 2,
      name: "shri",
      totaltax: 3200,
      lastdate: "10-sep-2020",
      status: "overdue",
    },
    {
      id: 3,
      name: "ajay",
      totaltax: 3200,
      lastdate: "10-sep-2020",
      status: "pending",
    },
  ];
  
  React.useEffect(() => {
    setTaxPayer(data2);
  }, []);
  const logout = (event) => {
    event.preventDefault();
    fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/login");
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          {" "}
          Admin
        </Title>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Header>
      <div style={{ padding: "5%" }}>
        <Divider orientation="left">Tax Accountant</Divider>

        <List
          header={<div>List of Tax Accountants</div>}
          footer={
            <Button
              onClick={() => history.push("/create-tax-accountant")}
              type={"primary"}
            >
              Add More
            </Button>
          }
          bordered
          dataSource={taxAccoutant}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>{item.name}</Typography.Text> {item.email}
            </List.Item>
          )}
        />
      
        <Divider orientation="left">
          Tax Payers{" "}
          <div>
            <Select
              placeholder="Filter"
              onChange={(e) => {
                setTaxPayer(data2.filter((value) => value.status === e));
              }}
              allowClear
            >
              <Option value="pending">pending</Option>
              <Option value="paid">paid</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </div>
        </Divider>

        <Table columns={columns} dataSource={taxpayer} />
        <Button>Add Tax Payer</Button>
      </div>
    </div>
  );
};

export default AdminBoard