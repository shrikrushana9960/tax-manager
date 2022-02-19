import React from "react";
import { Layout, Table, Tag, Space, Typography, Divider, Button } from "antd";
import { useHistory } from "react-router-dom";

const TaxAccountantBoard = () => {
  let history = useHistory();
  const { Title } = Typography;
  const { Content, Header } = Layout;
  

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
          Tax Payment
        </Title>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Header>
      <div style={{ padding: "5%" }}>
        <Divider orientation="left">Tax Payers</Divider>

        <Title level={2} style={{ margin: 0 }}>
          Welcome Shri
        </Title>
        <p style={{  margin: 0 }}> Your Tax for month April 2002  is remaning</p>
        <Button type={"primary"}>Pay Tax</Button>
      </div>
    </div>
  );
};

export default TaxAccountantBoard;
