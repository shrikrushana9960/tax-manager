import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Typography, Select } from "antd";
import {
  UserOutlined,
  CarryOutOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../actions/actions";

const { Title } = Typography;

const Payment = ({ history }) => {
  const { Option } = Select;
  const [email, setLocalEmail] = useState("");
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [liveState, useliveState] = "";

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ email, name, pan, liveState }),
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
        message.error("Error in register please try again");
      });
  };

  return (
    <CustomLayout>
      <Form name="normal_login" initialValues={{ remember: true }}>
        <Title level={4} style={{ textAlign: "center" }}>
          Payment
        </Title>
        <Form.Item
          name="card"
          rules={[
            {
              required: true,
              type: "card",
              message: "Please enter valid cardno!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<CreditCardOutlined className="site-form-item-icon" />}
            placeholder="Card No"
          />
        </Form.Item>
        <Form.Item
          name="cvv"
          rules={[
            {
              required: true,
              type: "cvv",
              message: "Please enter cvv!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="cvv"
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              type: "name",
              message: "Please enter card holder name!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Card holder name"
            onChange={(e) => setPan(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              type: "date",
              message: "Please enter Expiry date!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<CarryOutOutlined  className="site-form-item-icon" />}
            placeholder="Please enter Expiry date!"
            onChange={(e) => setPan(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type={"primary"} onClick={onSubmit} block>
            Pay
          </Button>
        </Form.Item>
      </Form>
    </CustomLayout>
  );
};

export default Payment;
