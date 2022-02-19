import React from 'react'
import { Layout,List, Typography, Divider,Button,Table,Tag,Space } from 'antd';
import { useHistory } from "react-router-dom";

const AdminBoard = () => {
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
        
             <Tag color={status==="paid"?"green":"red"} key={status}>
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
    const data = [
  'shri',
  'ajay',
  'ragav',
  'anil',
  'jadu',
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
          footer={<Button type={"primary"}>Add More</Button>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>Accountant</Typography.Text> {item}
            </List.Item>
          )}
        />
        <Divider orientation="left">Tax Payers</Divider>

        <Table columns={columns} dataSource={data2} />
      </div>
    </div>
  );
}

export default AdminBoard