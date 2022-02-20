import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Typography,Select } from "antd";
import { UserOutlined, MailTwoTone } from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../actions/actions";
const { Option } = Select;
const { Title } = Typography;

const CreateTaxAccountant = ({ history }) => {
  const [email, setLocalEmail] = useState("");
  const [name, setName] = useState("");
  const [password,setPassword]=useState("");
  const [livestate,setliveState]=useState("");
  const [pan,setPan]=useState("");
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/tax-accountant/register", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email,
        name,
        role: "TAX_ACCOUNTANT",
        stateId: livestate,
        panNumber: pan,
        password,
        taxPayerIds: [],
      }),
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
              message: "Please enter Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="state"
          rules={[
            {
              required: true,

              message: "Please enter state!",
            },
          ]}
        >
          <Select
            placeholder="state"
            onChange={(e) => {
              setliveState(e);
            }}
            allowClear
          >
            <Option value="goa">Goa</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Pan"
          rules={[
            {
              message: "Please enter Pan Number!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Pan Number"
            onChange={(e) => setPan(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
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
