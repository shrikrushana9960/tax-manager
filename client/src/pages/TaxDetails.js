import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { UserOutlined, MailTwoTone } from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../actions/actions";

const { Title } = Typography;

const CreateTaxAccountant = ({ history }) => {
  const [income, setIncome] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ income, date, taxPayerId }),
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
         Tax details
        </Title>
        <Form.Item
          name="income"
          rules={[
            {
              required: true,
              type: "income",
              message: "Please enter valid Income!",
            },
          ]}
          hasFeedback
        >
          <Input
             placeholder="Enter Income "
            onChange={(e) => setIncome(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="date"
         
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="date"
            onChange={(e) => setDate(e.target.value)}
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
