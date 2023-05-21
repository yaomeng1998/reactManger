import { Button, Checkbox, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
const AddForm = (props) => {
    const [form] = Form.useForm();
    const {firstList,parentId}=props
    form.setFieldValue('parentId',String(parentId))
    useEffect(()=>{
        props.getForm(form)
    },[])
    return (
        <Form
            form={form}
            name="basic"
            wrapperCol={{
                span: 10,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                name="parentId"
            >
                <Select style={{ width: 400,marginLeft:40 }}>
                    <Select.Option value='0'>一级分类</Select.Option>
                    {
                        firstList.map(res=>{
                            return <Select.Option key={res._id} value={res._id}>{res.name}</Select.Option>
                        })
                    }
                </Select>
                 
            </Form.Item>

            <Form.Item
                name="categoryName"
                rules={[{ required: true, message: '分类名称未填' }]}
            >
            <Input placeholder="请输入分类名称" style={{ width: 400,marginLeft:40 }} />
            </Form.Item>
        </Form>
    );
};
export default AddForm;