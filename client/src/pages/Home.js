import React from "react";
import {Layout, Typography, Button} from "antd";
import { useCookies } from "react-cookie";
const {Content, Header} = Layout;
const {Title} = Typography;


const Home = (props) => {
  

    const logout = (event) => {
      event.preventDefault();
      fetch("/api/logout", {
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            props.history.push("/login");
          } else {
            throw new Error(res.error);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    return (<Layout style={{width: "100%", height: "100vh"}}>
      <Header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Title level={3} style={{color: "white", margin: 0}}> Tax mangment </Title>
        <Button type="primary" onClick={logout}>Logout</Button>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {props.children}
      </Content>
    </Layout>)

  }
;

export default Home;
