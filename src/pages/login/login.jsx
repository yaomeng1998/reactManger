import React, { useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {  UserOutlined,VerifiedOutlined } from '@ant-design/icons';
import './login.less'
import logo from './imgages/logo.png'
export default function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login'>
      <header className='header'>
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='content'>
        <span style={{ fontWeight: 600, fontSize: 25, marginTop: 30 }}>用户登录</span>
        <Form
          style={{ marginTop: 40 }}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            prefix={<UserOutlined />}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password prefix={<VerifiedOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 9,
            }}
          > 
            <Button style={{width:300}} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

