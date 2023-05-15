import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import { useLocation ,useNavigate} from 'react-router-dom'
import { QuestionCircleOutlined } from '@ant-design/icons';
import userStorage from '../../utils/userStorage'
import userMemory from '../../utils/userMemory'
import './index.less'

export default function Header() {
  const [date, setDate] = useState()
  var { pathname } = useLocation()
  const [name, setName] = useState('')
  const [username, setUsernmae] = useState(userMemory.user.username)
  //弹窗
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    userStorage.removeUser()
    userMemory.user={}
    setIsModalOpen(false);
    navigate('/login')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let timer=setInterval(() => {
      setDate(new Date(Date.now()).toLocaleString())
    }, 1000)
    return ()=>{
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {
    if (pathname == '/admin/user') setName('用户管理')
    if (pathname == '/admin/home') setName('首页')
    if (pathname == '/admin/product') setName('商品管理')
    if (pathname == '/admin/category') setName('品类管理')
    if (pathname == '/admin/pie') setName('饼状图')
    if (pathname == '/admin/line') setName('折线图')
    if (pathname == '/admin/bar') setName('柱状图')
    if (pathname == '/admin/role') setName('角色管理')
  }, [pathname])
  return (
    <div className="header-header">
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <QuestionCircleOutlined style={{marginRight:15}} /><span >确定要退出吗</span>
      </Modal>
      <div className='header-top'>
        <span style={{ marginRight: '15px' }}>欢迎，{username}</span>
        <span style={{ color: 'green' ,cursor:'pointer'}} onClick={showModal} >退出</span>
      </div>
      <div className='header-bottom'>
        <div className="header-bottom-left">
          <span>{name}</span>
        </div>
        <div className="header-bottom-right">
          <span>{date}</span>
          <img src="https://assets.msn.cn/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/CloudyV3.svg" alt="" />
          <span>阴</span>
        </div>
      </div>
    </div>
  )
}
