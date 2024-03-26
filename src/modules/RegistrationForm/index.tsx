import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import LoginForm from "../LoginForm";

interface RegistrationFormProps {
  visible: boolean;
  onCancel: () => void;
}

const StyledButton = styled(Button)`
  & {
    height: 40px;
    width: 185px;
    border-radius: 10px;
    background: rgba(103, 184, 203, 0.06);
    color: #67b8cb;

    &:hover {
      background: rgba(103, 184, 203, 0.03);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: scale(0.9);
    }

    &:focus {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }
  }
`;

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  visible,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    console.log("Login values:", values);
    setLoading(false);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleShowLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleCancelLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <>
      <Modal
        title={
          <div style={{ textAlign: "center", color: "#9333ea" }}>
            REGISTRATION
          </div>
        }
        open={visible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div>
              Do you have an account?{" "}
              <Link
                href="#"
                onClick={handleShowLoginModal}
                style={{ color: "red" }}
              >
                Login
              </Link>
            </div>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              Login
            </StyledButton>
          </Form.Item>
        </Form>
      </Modal>
      <LoginForm
        visible={loginModalVisible}
        onCancel={handleCancelLoginModal}
      />
    </>
  );
};

export default RegistrationForm;
