import React from 'react'
import { Layout, Table, Tag, Space, Typography, Divider, Button } from "antd";
import { useHistory } from "react-router-dom";

const TaxAccountantBoard = () => {
    let history = useHistory();
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
const data   = [
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
      <div style={{ padding: "5%" }}>
        <Divider orientation="left">Tax Payers</Divider>

        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default TaxAccountantBoard