import { useLoginMutation } from "@/redux/api/baseApi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import donationImg from "../assets/images/loginImg.jpg";

import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginData] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await loginData(values).unwrap();
      console.log(response);
      dispatch(login({ token: response.token, user: response.userData }));
      // Save token in local storage for persistence
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.userData));
      if (response) {
        navigate("/user/profile");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="grid grid-cols-12 items-center h-screen dark:bg-dark-background dark:text-dark-text bg-white">
      <div className="col-span-12 md:col-span-6">
        <img src={donationImg} className="object-cover" alt="Donation" />
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col items-center">
        <Form
          name="normal_login"
          className="login-form w-[50%]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* {error && error.data && (
            <p className="text-red-700 mb-5">{error?.data.message}</p>
          )}  */}
          <Form.Item>
            <Button
              type="primary"
              danger
              htmlType="submit"
              className="login-form-button mr-5"
            >
              Login
            </Button>
            Or{" "}
            <NavLink to="/register" className="ml-3">
              register now!
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
