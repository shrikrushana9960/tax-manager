import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form, Input, Typography, message} from "antd";
import {LockTwoTone, MailTwoTone, SmileTwoTone} from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";

const {Title} = Typography;

const SignUp = ({history}) => {
  const [email, setLocalEmail] = useState("");
  const [name, setLocalName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role: "ADMIN" }),
      headers: {
        "Content-Type": "application/json",
      },
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
        message.error("Error Creating Account please try again");
      });
  };
  return (
    <CustomLayout>
      <Form
        name="normal_signup"
        initialValues={{remember: true}}
      >
        <Title level={4} style={{textAlign: "center"}}>Create Account</Title>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your Name!",
            },
          ]}
        >
          <Input
            prefix={<SmileTwoTone className="site-form-item-icon"/>}
            placeholder="Your Name"
            onChange={(e) => setLocalName(e.target.value)}
          />
        </Form.Item>
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
            prefix={<MailTwoTone className="site-form-item-icon"/>}
            placeholder="yourmail@domain.com"
            onChange={(e) => setLocalEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockTwoTone className="site-form-item-icon"/>}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockTwoTone className="site-form-item-icon"/>}
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} onClick={onSubmit} block>
            Create Account
          </Button>
         
        </Form.Item>
      </Form>
    </CustomLayout>
  );
};

export default SignUp;
