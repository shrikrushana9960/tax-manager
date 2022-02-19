import React from 'react'
import { Layout,List, Typography, Divider,Button } from 'antd';
import { useHistory } from "react-router-dom";

const AdminBoard = () => {
    let history = useHistory();
    const { Title } = Typography;
const { Content, Header } = Layout;
    const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
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
      <div style={{padding:"5%"}}>
        <Divider orientation="left">Admin Name</Divider>

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
      </div>
    </div>
  );
}

export default AdminBoard