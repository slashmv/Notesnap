import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, theme } from "antd";
import { useAuth } from "./components/AuthProvider";
import { useState } from "react";

export default function LoginPage() {
  const { useToken } = theme;
  const { token } = useToken();
  const user = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const onFinish = async (values) => {
    const userDetails = {
      username: values.username,
      password: values.password,
    };
    try {
      await user.loginAction(userDetails);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: token.colorBgBase,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Log In</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {errorMessage && (
            <h6 style={{ textAlign: "center", color: "red" }}>
              {errorMessage}
            </h6>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
