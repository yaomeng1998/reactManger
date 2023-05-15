import React, { useEffect, useState } from 'react'
import { Card, Button, Space, Table, Tag, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getFirstList, addList, updateFirstList, getSecondList } from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'
import { ArrowRightOutlined } from '@ant-design/icons';
const success = (e) => {
  message.success(`${e}`);
};

const error = (e) => {
  message.error(`${e}`);
};

export default function Catecory() {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
    },
    {
      key: '2',
      name: 'Jim Green',
    },
    {
      key: '3',
      name: 'Joe Black',
    },
  ])
  const [subShow, setSubShow] = useState(true)
  const [firstList, setFirstList] = useState([])
  useEffect(() => {
    showFirst()
  }, [])
  //查看一级
  var showFirst = () => {
    setRecord({
      ...record,
      _id: 0
    })
    getFirstList().then(res => {
      setSubShow(true)
      if (res.data.status != 0) success('获取一级列表失败')
      else {
        setData(res.data.data)
        setFirstList(res.data.data)
      }
    })
  }
  //查看二级
  var showChildKind = (record) => {
    setSubShow(false)
    setRecord(record)
    getSecondList({ 'parentId': record._id }).then(res => {
      setData(res.data.data);
    })
  }
  //弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [category, setCategory] = useState('');
  const [form, setForm] = useState({});
  const [secondForm, setSecondForm] = useState({});
  const [record, setRecord] = useState({});
  //添加
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    secondForm.validateFields().then(res=>{
      var { parentId, categoryName } = secondForm.getFieldsValue(true)
    addList({ parentId, categoryName }).then(res => {
      if (parentId == 0) showFirst()
      else {
        getSecondList({ 'parentId': parentId }).then(res => {
          setData(res.data.data);
        })
      }
    })
    secondForm.resetFields()
    setIsModalOpen(false);
    }).catch(err=>{
      error('分类名称未填')
    })
    
  };
  const handleCancel = () => {
    secondForm.resetFields()
    setIsModalOpen(false);
  };
  //修改分类
  var updateCategory = (record) => {
    setCategory(record)
    setIsUpdate(true);
  }
  const updateOk = () => {
    form.validateFields().then(res => {
      updateFirstList({
        categoryId: category._id,
        categoryName: form.getFieldValue('kindName')
      }).then(res => {
        if (category.parentId == 0) showFirst()
        else {
          getSecondList({ 'parentId': category.parentId }).then(res => {
            setData(res.data.data);
          })
        }

      })
      setIsUpdate(false);
    }).catch(err=>{
      error('分类名称未填')
    })
  };
  const updateCancel = () => {
    setIsUpdate(false);
  };
  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      width: 300,
      key: 'action',
      render: (value, record) => {
        return (
          <>
            <Space
              size='middle'>
              <a onClick={() => { updateCategory(record) }}>修改分类</a>
              {subShow ? <a onClick={() => showChildKind(record)}>查看子分类</a> : <a></a>}
            </Space>
          </>
        )
      }
    },
  ];
  //父给子传递的函数
  var getForm = (form) => {
    setForm(form)
  }
  return (
    <div >
      <Modal title="添加" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddForm firstList={firstList} parentId={record._id || 0} getForm={(secondForm) => {
          setSecondForm(secondForm)
        }} />
      </Modal>
      <Modal title="修改分类" open={isUpdate} onOk={updateOk} onCancel={updateCancel}>
        <UpdateForm categoryName={category.name} getForm={getForm} />
      </Modal>
      <Card
        title={!subShow ? <span onClick={showFirst} style={{ cursor: 'pointer' }}>一级分类列表<ArrowRightOutlined style={{ marginRight: 20, marginLeft: 20, cursor: 'pointer' }} />{record.name}</span> : <span>一级分类列表 </span>} extra={<><Button onClick={showModal} type='primary' ><><PlusOutlined />添加</></Button></>} style={{ width: '100%' }}>
        <Table
          size='middle'
          rowKey='_id'
          bordered
          columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}
