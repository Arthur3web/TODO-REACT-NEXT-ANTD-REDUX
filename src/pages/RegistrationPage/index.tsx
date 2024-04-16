import { useState } from "react";
import { Form, Input, message, Flex, Card } from "antd";
import Link from "next/link";
import axios from "axios";
import { UserType } from "@/redux/features/interface/types";
import { useAppDispatch } from "@/redux/hooks";
import { createUser } from "@/redux/features/userSlice/user-slice";
import { StyledButton } from "@/ui/Buttons/StyleButton";

const RegistrationPage: React.FC = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>([]);
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    if (email && password && username) {
      try {
        const response = await axios.post(
          `https://jsonplaceholder.typicode.com/users`,
          {
            email: email,
            password: password,
            username: username,
          }
        );
        console.log(response);
        setUsers((prevUsers) => [...prevUsers, response.data]);
        console.log(users);
        dispatch(createUser(response.data));
        setEmail("");
        setPassword("");
        setUsername("");
        message.open({
          type: "success",
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

  return (
    <>
      <Flex justify="center">
        <Card
          title="REGISTRATION"
          style={{ textAlign: "center", color: "#9333ea", width: 300 }}
        >
          <Form
            name="register"
            onFinish={handleRegister}
            >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div>
                Do you have an account?{" "}
                <Link href="/LoginPage" style={{ color: "red" }}>
                  Login
                </Link>
              </div>
              <StyledButton type="primary" htmlType="submit">
                Register
              </StyledButton>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default RegistrationPage;
