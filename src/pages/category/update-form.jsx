import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
const UpdateForm = (props) => {
  const [form] = Form.useForm();
  form.setFieldValue('kindName', props.categoryName)
  useEffect(() => {
    props.getForm(form)
  }, [])
  
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="分类名称"
        name="kindName"
        rules={[{ required: true, message: '分类名称未填' }]}
      >
        <Input />
      </Form.Item>

    </Form>
  );
};
export default UpdateForm;