import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { Card, Form, Input, Cascader, message, Upload, Button } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router';
import { getFirstList, getSecondList, addProduct, deleteImg, updateProduct } from '../../api'
import ImgCrop from 'antd-img-crop';
import RichEditor from './richEditor';
const Item = Form.Item
const { TextArea } = Input;


//upload
export default function UpdateProduct() {
  const imgRef = useRef()
  const editorRef = useRef()
  const [form] = Form.useForm()
  const location = useLocation()
  const [options, setOptions] = useState([]);
  const [fileList, setFileList] = useState([]);

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
    async function fetchData() {
      if (location.state) {
        var list = []
        const record = location.state.record
        list.push(record.pCategoryId)
        list.push(record.categoryId)
        var second = await getSecondList({ 'parentId': record.pCategoryId })
        second = second.data.data.map((e) => {
          return {
            value: e._id,
            label: e.name,
            isLeaf: true
          }
        })
        var first = await getSecondList({ 'parentId': 0 })
        first = first.data.data.map((e) => {
          return {
            value: e._id,
            label: e.name,
            isLeaf: false
          }
        })
        var targetOption = first.find((e) => {
          return e.value = record.pCategoryId
        })
        targetOption.children = second
        setOptions([...first])
        form.setFieldsValue({ 'name': record.name, 'desc': record.desc, 'price': record.price, 'category': list })
        var imgList = record.imgs.map((e, index) => {
          return {
            uid: -index,
            name: e,
            status: 'done',
            url: "http://10.6.30.62:5000/upload/" + e,
          }
        })
        setFileList(imgList)
      }
    }
    fetchData()
  }, [])

  //upload

  const onChange = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status == 'done') {
      var newFile = fileList[fileList.length - 1]
      if (newFile.response.status == 0) {
        message.success('图片上传成功')
        const { name } = newFile.response.data
        newFile.name = name
        setFileList(fileList)
      } else {
        message.error('图片上传失败')
      }
    }
    if (file.status == 'removed') {
      console.log(file.name);
      deleteImg({ name: file.name}).then((res) => {
        message.success('图片删除成功')
      })
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  //自验证price
  //级联选择
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    const result = await getSecondList({ 'parentId': targetOption.value })
    if (result.data.data.length > 0 && result) {
      var secondList = result.data.data.map(res => {
        return {
          value: res._id,
          label: res.name,
          isLeaf: true
        }
      })
      targetOption.children = secondList
      setOptions([...options]);
    } else {
      targetOption.isLeaf = true
    }
  };

  const navigate = useNavigate()
  //提交表单
  var submit = () => {
    form.validateFields().then((values) => {
      var list = imgRef.current.fileList.map((e) => {
        return e.name
      })
      if (values.category.length > 1) {
        var pCategoryId = values.category[0]
        var categoryId = values.category[1]
      } else {
        var pCategoryId = '0'
        var categoryId = values.category[1]
      }
      var params = {
        name: values.name,
        desc: values.desc,
        detail: editorRef.current,
        pCategoryId: pCategoryId,
        categoryId: categoryId,
        price: values.price,
        imgs: list
      }
      if (!location.state) {
        addProduct(params).then(res => {
          message.success('添加成功')
          navigate(-1)
        })
      } else {
        var upParams = {
          ...params,
          _id: location.state.record._id
        }
        updateProduct(upParams).then(res => {
          message.success('更新成功')
          navigate(-1)
        })
      }

    }).catch((err) => {
      message.error('提交失败')
    }

    )
  }
  return (
    <Card title={
      <div style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => { navigate(-1) }}><ArrowLeftOutlined style={{ marginRight: 15 }} />{location.state ? '修改商品' : '添加商品'}</div>
    } style={{ width: '100%' }}>
      <Form
        form={form}>
        <Item
          label='商品名称'
          name='name'
          rules={[{ required: true, message: '请输入商品名称!' }]}
        >
          <Input style={{ width: '500px' }} placeholder="请输入商品名称" />
        </Item>
        <Item
          label='商品描述'
          name='desc'
          rules={[{ required: true, message: '请输入商品描述' }]}>
          <TextArea style={{ width: '500px' }} autoSize={{ minRows: 2, maxRows: 6 }} placeholder='请输入商品描述' />
        </Item>
        <Item
          label='商品价格'
          name='price'
          rules={[{ required: true, message: '请输入商品价格' },
            // ({ getFieldValue }) => ({
            //   validator(_, value) {
            //     if (value * 1 > 0) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(new Error('输入不合法'));
            //   },
            // }),
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
          name='image'>
          <ImgCrop rotationSlider>
            <Upload
              ref={imgRef}
              name="image"
              action="/manage/img/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Item>
        <Item
          style={{ marginLeft: 10 }}
          label='商品详情'
          name='detail'>
          {location.state ? <RichEditor detail={location.state.record.detail} ref={editorRef} /> : <RichEditor ref={editorRef} />}
        </Item>
        <Item>
          <Button type='primary' onClick={submit}>提交</Button>
        </Item>
      </Form>
    </Card>
  )
}
