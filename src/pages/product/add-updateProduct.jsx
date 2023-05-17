import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Cascader, message, Upload, InputNumber } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router';
import { getFirstList, getSecondList } from '../../api'
const Item = Form.Item
const { TextArea } = Input;


//upload
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export default function UpdateProduct() {
  const [options, setOptions] = useState([]);
  const [childOptions, setChildOptions] = useState([]);
  useEffect(() => {
    getFirstList().then(res => {
      var list = res.data.data.map(e => {
        return {
          value: e._id,
          label: e.name,
          isLeaf: false,
        }
      })
      setOptions(list)
    })
  }, [])
  useEffect(() => {

  }, [childOptions])
  //upload
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //自验证price
  //级联选择
  const loadData = async (selectedOptions) => {
    console.log(selectedOptions[0]);
    const targetOption = selectedOptions[0];
    // console.log(targetOption);
    targetOption.loading = true;

    const result = await getSecondList({ 'parentId': targetOption.value })
    let secondList = result.data.data.map(res => {
      return {
        value: res._id,
        label: res.name
      }
    })
    targetOption.children = secondList
    console.log(targetOption);
    console.log(options);
    setChildOptions(secondList)
    // setOptions([...options]);


    targetOption.loading = false;

  };

  const navigate = useNavigate()
  return (
    <Card title={
      <div style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => { navigate(-1) }}><ArrowLeftOutlined style={{ marginRight: 15 }} />添加商品</div>
    } style={{ width: '100%' }}>
      {console.log('render')}
      <Form>
        <Item
          label='商品名称'
          name='name'
          rules={[{ required: true, message: '请输入商品名称!' }]}
        >
          <Input style={{ width: '500px' }} placeholder="请输入商品名称" />
        </Item>
        <Item
          label='商品描述'
          name='dsc'
          rules={[{ required: true, message: '请输入商品描述' }]}>
          <TextArea style={{ width: '500px' }} autoSize={{ minRows: 2, maxRows: 6 }} placeholder='请输入商品描述' />
        </Item>
        <Item
          label='商品价格'
          name='price'
          rules={[{ required: true, message: '请输入商品价格' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value * 1 > 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('你输入的不是数字'));
            },
          }),
          ]}>
          <Input type='number' style={{ width: '500px' }} placeholder='请输入商品价格' addonAfter="元" />
        </Item>
        <Item
          label='商品分类'
          name='category'
          rules={[{ required: true, message: '请选择商品分类' }]}>
          <Cascader style={{ width: 500 }} options={options} loadData={loadData} />
        </Item>
        <Item
          style={{ marginLeft: 10 }}
          label='商品图片'
          name='img'>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Item>
      </Form>
    </Card>
  )
}
