import React, { useState } from "react";
import { Form, Input, message, Flex, Card } from "antd";
import Link from "next/link";
import { loginUser } from "@/redux/features/userSlice/actions";
import router from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import { StyledButton } from "@/ui/Buttons/StyleButton";

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: "",
  password: "",
};

const LoginPage: React.FC = ({}) => {
  const isBrowser = typeof window !== "undefined"; // Проверяем, что код выполняется в браузерной среде
  const [isLogin, setIsLogin] = useState<boolean>(
    isBrowser && localStorage.getItem("isLoggedIn") === "true"
  );
  const dispatch = useAppDispatch();

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      const action = await dispatch(loginUser({ email, password }));
      const user = action.payload;
      if (user) {
        setIsLogin(true);
        router.push("/"); // Перенаправление на главную страницу
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("Ошибка входа:", error.message);
    }
  };

  return (
    <>
      <Flex justify="center">
        <Card
          title="AUTHORIZATION"
          style={{ textAlign: "center", color: "#9333ea", width: 300 }}
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <div>
                Don't have an account?{" "}
                <Link href="/RegistrationPage" style={{ color: "red" }}>
                  Register
                </Link>
              </div>
              <StyledButton type="primary" htmlType="submit">
                Login
              </StyledButton>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default LoginPage;
