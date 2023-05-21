import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api'
export default function AddUpdate(props) {
    const [role, setRole] = useState([])
    const [form] = Form.useForm();
    useEffect(() => {
        props.getForm(form)
        getUsersList()
    }, [])
    var getUsersList = () => {
        getUsers().then(res => {
            setRole(res.data.data.roles)
        })
    }
    const { info } = props
    form.setFieldsValue(info)
    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>
            {info._id ? '' : <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input.Password />
            </Form.Item>}
            <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请输入手机号!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="角色"
                name="role_id"
            >
                <Select>
                    {role.map(res => {
                        return <Select.Option key={res._id} value={res._id}>{res.name}</Select.Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    );
};