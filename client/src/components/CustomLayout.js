import {Layout, Typography} from "antd";
import React from "react";

const {Content, Header} = Layout;
const {Title} = Typography;

const CustomLayout = (props) => {
  return (<Layout style={{width: "100%", height: "100vh"}}>
    <Header style={{
      display: "flex",
      alignItems: "center"
    }}>
      <Title level={3} style={{color: "white", margin: 0}}> Tax System </Title>
    </Header>
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      {props.children}
    </Content>
  </Layout>);
}
export default CustomLayout;