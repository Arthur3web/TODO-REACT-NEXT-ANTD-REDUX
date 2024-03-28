import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import RegistrationForm from "../RegistrationForm";
import { useForm } from "antd/es/form/Form";

interface LoginFormProps {
  visible: boolean;
  onCancel: () => void;
  onLogin: () => void;
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

interface IInitialValues  {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: '',
  password: ''
}

const LoginForm: React.FC<LoginFormProps> = ({ visible, onCancel, onLogin }) => {
  // const [form] = useForm()
  const [loading, setLoading] = useState(false);
  const [registrationModalVisible, setRegistrationModalVisible] =
    useState(false);
    // console.log(form)
  const handleLogin = async (values: any) => {
    onLogin();
    setLoading(true);;
    onCancel();
  };

  const handleCloseModal = () => {
    onCancel();
  };

  const handleShowRegistrationModal = () => {
    setRegistrationModalVisible(true);
    onCancel();
  };

  const handleCancelRegistrationModal = () => {
    setRegistrationModalVisible(false);
  };

  return (
    <>
      <Modal
        title={
          <div style={{ textAlign: "center", color: "#9333ea" }}>
            AUTHORIZATION
          </div>
        }
        open={visible}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <Form
          name="login"
          initialValues={initialValues}
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
          <Form.Item>
            <div>
              Don't have an account?{" "}
              <Link
                href="#"
                onClick={handleShowRegistrationModal}
                style={{ color: "red" }}
              >
                Register
              </Link>
            </div>
            <StyledButton type="primary" htmlType="submit" /*loading={loading}*/  >
              Login
            </StyledButton>
          </Form.Item>
        </Form>
      </Modal>
      <RegistrationForm
        visible={registrationModalVisible}
        onCancel={handleCancelRegistrationModal}
      />
    </>
  );
};

export default LoginForm;
