import { Button, Form, Input } from "antd";
import "./index.css";
import { useCallback } from "react";
import { login } from "./api";
import { message } from "../../utils/antd-global";
import { useNavigate } from "react-router-dom";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export function Login() {
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: LoginUser) => {
    const res = await login(values);
    console.log("🚀 ~ onFinish ~ res:", res);
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    localStorage.setItem("user_info", JSON.stringify(res.data.userInfo));

    setTimeout(() => {
      navigate("/");
    }, 1000);
    message.success("登录成功!");
  }, []);

  return (
    <div id="login-container">
      <h1>会议室预订系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
