import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
export default function AddForm(props) {
    const [form] = Form.useForm();
    useEffect(()=>{
        props.getform(form)
    },[])
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="角色名称"
                name="roleName"
                rules={[
                    {
                        required: true,
                        message: '请输入角色名称!',
                    },
                ]}
            >
                <Input />
            </Form.Item>


        </Form>
    )
}
