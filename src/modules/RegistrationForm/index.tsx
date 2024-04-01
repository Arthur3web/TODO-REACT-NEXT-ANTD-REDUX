import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import Link from "next/link";
import styled from "styled-components";
import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DataTypes } from "@/ui/CustomTable/CustomTable";
import { createUser } from "@/redux/features/user-slice";

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
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  // const [users, setUsers] = useState<DataTypes[]>([]);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (email && password && username) {
      try {
        const response = await axios.post<DataTypes>(
          `https://jsonplaceholder.typicode.com/users`,
          {
            email: email,
            password: password,
            username: username,
          }
        );
        // setUsers((prevUsers) => [...prevUsers, response.data]);
        console.log(response);
        // console.log(users);
        dispatch(createUser(response.data))
        setEmail("");
        setPassword("");
        setUsername("");
        message.open({
          type: "error",
          content: "Пользователь зарегистрирован",
        });
      } catch (error: any) {
        message.open({
          type: "error",
          content: "Неполные данные",
        });
      }
    }
  };

  const handleCancel = () => {
    onCancel();
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
        <Form onFinish={handleRegister}>
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
              <Link href="#" style={{ color: "red" }}>
                Login
              </Link>
            </div>
            <StyledButton type="primary" htmlType="submit">
              Register
            </StyledButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegistrationForm;
