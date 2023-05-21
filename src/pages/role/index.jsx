import React, { useEffect, useRef } from 'react'
import { getRoles, addRole, updateRole, deleteRole, deleteProduct } from '../../api'
import { Card, Button, Divider, Radio, Table, Modal, message } from 'antd';
import { useState } from 'react'
import AddForm from './add-form'
import Auth from './auth-form'
import userStorage from '../../utils/userStorage'
import timestampToTime from '../../utils/timeChange'
import UserMerory from '../../utils/userMemory'
import { useNavigate } from 'react-router-dom';

export default function Role() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [role, setRole] = useState({})
  const [form, setForm] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const authRef = useRef()
  //点击选行
  var onrow = (record) => {
    return {
      onClick: event => {
        setRole(record)
      }
    }
  }
  useEffect(() => {
    getRolesList()
  }, [])
  var getRolesList = () => {
    getRoles().then(res => {
      setData(res.data.data)
    }
    )
  }
  //创建角色
  const showModal = () => {
    console.log(77);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(res => {
      addRole(res).then(res => {
        getRolesList()
        message.success('添加成功')
      })
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //修改role权限
  const showAuth = () => {
    setIsAuthOpen(true);
  };

  const authOk = () => {
    var params = {
      ...role,
      auth_time: Date.now(),
      auth_name: userStorage.getUser().username,
      menus: authRef.current
    }
    updateRole(params).then(res => {
      // console.log(UserMerory.user.username);
      // console.log(params.auth_name);
      if (params.auth_name === UserMerory.user.username) {
        message.warning('更改权限成功，请重新登录')
        navigate('/login')
      } else {
        message.success('更新权限成功')
        getRolesList()
      }
    })
    setIsAuthOpen(false);
  };
  const authCancel = () => {
    getRolesList()
    setIsAuthOpen(false);
  };
  //删除角色
  function deleteRo(record) {
    deleteRole({ _id: record._id }).then(res => {
      getRolesList()
      message.success('删除成功')
    })
  }
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (value, _) => timestampToTime(value)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (value, _) => timestampToTime(value)
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      render: (_, record) => {
        return (<a onClick={() => { deleteRo(record) }}>删除</a>)
      }
    },
  ];
  return (
    <Card
      title={<>
        <Button type='primary' onClick={showModal}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' onClick={showAuth} disabled={!role._id}>设置角色权限</Button>
      </>}
      style={{
        width: '100%',
      }}
    >
      <Modal title="添加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AddForm getform={(form) => { setForm(form) }} />
      </Modal>
      <Modal title="修改权限" open={isAuthOpen} onOk={authOk} onCancel={authCancel}>
        <Auth ref={authRef} role={role} />
      </Modal>
      <Table
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onSelect:(role) => {
            setRole(role)
          }
        }}

        bordered
        rowKey={'_id'}
        columns={columns}
        dataSource={data}
        onRow={onrow}
        pagination={{
          pageSize: 5
        }}
      />
    </Card>
  )
}
