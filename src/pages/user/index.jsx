import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Space, Table, Tag, Modal, message } from 'antd';
import { getUsers, deleteUser, updateUser, addUser } from '../../api'
import AddUpdate from './add-update-form'

export default function User() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({});
  const [user, setUser] = useState({});
  const [roles, setRole] = useState([]);
  const navigate = useNavigate()
  //修改用户
  var update = (record) => {
    setUser(record)
    setIsModalOpen(true)
  }
  //列
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (value, record) => {
        // console.log(22,roles);
        return roles.find(e => {
          return e._id == record.role_id
        })?.name
      }
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <>
            <a onClick={() => { update(record) }}>修改</a>
            <br />
            <a onClick={() => {
              deleteUser({userId:record._id}).then(res=>{
                  getUsersList()
              })
            }}>删除</a>
          </>
        )
      }
    },

  ];

  useEffect(() => {
    getUsersList()
  }, [])
  var getUsersList = () => {
    getUsers().then(res => {
      setData(res.data.data.users)
      console.log(res.data.data.roles);
      setRole(res.data.data.roles)
    })
  }
  //创建和更新user
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then(res => {
      if(user._id){
        
        updateUser({...form.getFieldsValue(),_id:user._id}).then(res=>{
         message.success('修改成功')
        })
      }
      else{
        addUser(form.getFieldsValue()).then(res => {
          console.log(form.getFieldsValue());
          if(res.data.status==1) message.error(res.data.msg)
          else message.success('创建成功')
          getUsersList()
        }).catch(err=>{
          message.error(err)
        })
      }
      setIsModalOpen(false);
    }).catch(errorInfo => {
      message.error('含有未填项')
    });

  };
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };
  return (
    <div>
      <Card
        title={
          <Button type='primary' onClick={()=>{
            showModal()
    
            setUser({})
          }}>创建用户</Button>
        }
        style={{
          width: '100%',
        }}
      >
        <Table rowKey={'_id'} columns={columns} dataSource={data}
          pagination={{
            defaultPageSize: 5
          }} />
      </Card>
      <Modal title={
        user._id ? '修改用户' : "创建用户"
      } open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddUpdate getForm={(form) => { setForm(form) }} info={user} />
      </Modal>
    </div>
  )
}
