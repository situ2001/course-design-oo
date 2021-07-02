// login page for Manager
/* eslint-disable react/prefer-stateless-function */
import { FormInstance, Form, Input, Button, message } from 'antd';
import React from 'react';
import login from '../controllers/Login';
import './styles/Login.global.css';

type Props = {
  refresh: () => void;
  foo: number;
};

export default class Login extends React.Component<Props> {
  private formRef;

  constructor(props: Props) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
  }

  private onFinished = (v: { username: string; password: string }) => {
    if (login(v.username, v.password)) {
      localStorage.setItem('loggedIn', 'true');
      message.success('登录成功');
    } else {
      message.error('账号或密码输入错误');
    }

    const { refresh } = this.props;
    refresh();
  };

  render() {
    return (
      <div className="container">
        <p className="login-hint">登录</p>
        <Form
          ref={this.formRef}
          onFinish={this.onFinished}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入你的用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        <div className="hint">
          <p>初始用户114 密码514</p>
          <p>请前往配置文件修改</p>
        </div>
      </div>
    );
  }
}
