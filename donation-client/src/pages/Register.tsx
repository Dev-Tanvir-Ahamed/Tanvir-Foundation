import { useRegisterMutation } from "@/redux/api/baseApi";
import { register as loginAction } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import donationImg from "../assets/images/loginImg.jpg";
import { FieldValues } from "react-hook-form";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values : FieldValues) => {
    try {
      const response = await registerUser(values).unwrap();
      console.log(response);

      // Save the token and user details in Redux
      dispatch(loginAction({ token: response.token, user: response.userData }));

      // Optionally, save token in local storage for persistence
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.userData));

      // Redirect to the user profile page
      navigate("/user/profile");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className=" grid grid-cols-12 items-center h-screen">
      <div className="col-span-12 md:col-span-6">
        <img src={donationImg} className=" object-cover" alt="" />
      </div>
      <div className=" col-span-12 md:col-span-6 flex flex-col  items-center ">
        <Form
          name="normal_login"
          className="login-form w-[50%]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
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
          {/* <p className=" text-red-700 mb-5">{error?.data?.message}</p> */}
          <Form.Item>
            <Button
              type="primary"
              danger
              htmlType="submit"
              className="login-form-button mr-5"
            >
              Register now
            </Button>
            Or{" "}
            <NavLink to="/login" className="ml-3">
              Login
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
