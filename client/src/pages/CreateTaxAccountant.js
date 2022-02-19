import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { UserOutlined, MailTwoTone } from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../actions/actions";

const { Title } = Typography;

const CreateTaxAccountant = ({ history }) => {
  const [email, setLocalEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ email,name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/adminboard");
        } else {
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(setName(res.name));
        dispatch(setEmail(email));
      })
      .catch((err) => {
        console.error(err);
        message.error("Error Resgister in please try again");
      });
  };

  return (
    <CustomLayout>
      <Form name="normal_login" initialValues={{ remember: true }}>
        <Title level={4} style={{ textAlign: "center" }}>
          Create Tax Accountant
        </Title>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid Email!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailTwoTone className="site-form-item-icon" />}
            placeholder="taxAccoutant@domain.com"
            onChange={(e) => setLocalEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              type: "name",
              message: "Please enter Name!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type={"primary"} onClick={onSubmit} block>
            Create Tax Accountant
          </Button>
        </Form.Item>
      </Form>
    </CustomLayout>
  );
};

export default CreateTaxAccountant;
