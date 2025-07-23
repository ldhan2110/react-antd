import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import type { LoginRequest } from '../types';
import { authStore } from '../stores';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: LoginRequest) => {
    // Handle login logic here
    authStore.login(values);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 350 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Login
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Company Code"
            name="companyCode"
            rules={[{ required: true, message: 'Please input your company code!' }]}
          >
            <Input placeholder="Enter company code" autoComplete="organization" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter username" autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter password" autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
