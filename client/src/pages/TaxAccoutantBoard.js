import React from 'react'
import { Layout, Table, Tag, Space, Typography, Divider, Button,Select,message } from "antd";
import { useHistory } from "react-router-dom";
import FillData from '../components/FillData';

const TaxAccountantBoard = () => {
  const [taxpayer,setTaxPayer]=React.useState([]);
  const [client,setClient]=React.useState([]);
  const data = [
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
  React.useEffect(()=>{
    setTaxPayer(data)
    const getData=async()=>{
       fetch("/taxPayers")
         .then((res) => {
           if (res.status === 200) {
            
           } else {
             throw new Error(res.error);
           }
           return res.json();
         })
         .then((res) => {
           setClient(res)
         })
         .catch((err) => {
           console.error(err);
           message.error("Error  in  Data please try again");
         });
      
    }
    getData()
  },[])
    let history = useHistory();
    const { Option } = Select;
    const { Title } = Typography;
const { Content, Header } = Layout;
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
const columns2 = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
 
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <FillData email={record.email}/>
      </Space>
    ),
  },
];


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
          Tax Accountant
        </Title>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Header>
      <Button onClick={() => history.push("/create-tax-payer")}>
        Create Client
      </Button>
      <div style={{ padding: "5%" }}>
        <Divider orientation="left">Client </Divider>

        <Table columns={columns2} dataSource={client} />
      </div>
      <div style={{ padding: "5%" }}>
        <Divider orientation="left">
          Tax Payers{" "}
          <div>
            <Select
              placeholder="Filter"
              onChange={(e) => {
                setTaxPayer(data.filter((value) => value.status === e));
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
      </div>
    </div>
  );
}

export default TaxAccountantBoard