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
       title: "Age",
       dataIndex: "age",
       key: "age",
     },
     {
       title: "Address",
       dataIndex: "address",
       key: "address",
     },
     {
       title: "Tags",
       key: "tags",
       dataIndex: "tags",
       render: (tags) => (
         <>
           {tags.map((tag) => {
             let color = tag.length > 5 ? "geekblue" : "green";
             if (tag === "loser") {
               color = "volcano";
             }
             return (
               <Tag color={color} key={tag}>
                 {tag.toUpperCase()}
               </Tag>
             );
           })}
         </>
       ),
     },
     {
       title: "Action",
       key: "action",
       render: (text, record) => (
         <Space size="middle">
           <a>Invite {record.name}</a>
           <a>Delete</a>
         </Space>
       ),
     },
   ];
   const data = [
     {
       key: "1",
       name: "John Brown",
       age: 32,
       address: "New York No. 1 Lake Park",
       tags: ["nice", "developer"],
     },
     {
       key: "2",
       name: "Jim Green",
       age: 42,
       address: "London No. 1 Lake Park",
       tags: ["loser"],
     },
     {
       key: "3",
       name: "Joe Black",
       age: 32,
       address: "Sidney No. 1 Lake Park",
       tags: ["cool", "teacher"],
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