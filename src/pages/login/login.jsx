import React, { useEffect ,useState} from 'react'
import { DatePicker, Space, message } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, VerifiedOutlined } from '@ant-design/icons';
import { login } from '../../api'
import './login.less'
import logo from './imgages/logo.png'
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import userStorage from '../../utils/userStorage'
import userMemory from '../../utils/userMemory'
const success = () => {
  message.success('登录成功');
};
const error = () => {
  message.error('用户名或密码错误');
};

export default function Login() {
  const navigate = useNavigate()
  const user=!!userMemory.user._id
  const onFinish = async (values) => {
    try {
      var response = await login(values)
    } catch (error) {
      console.log(error);
    }
    var res = response.data
    if (res.status === 0) {
      success()
      userStorage.saveUser(res.data)
      userMemory.user = res.data
      navigate('/admin')
    } else {
      error()
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
    {!user ? <div className='login'>
        <header className='login-header'>
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
              <Button style={{ width: 300 }} type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div> :<Navigate to="/admin" />}
      
    </>
  )
}

