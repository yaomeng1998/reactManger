import './index.less'
import logo from '../../assets/images/logo.png'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to="home">首页</Link>, '/admin/home', <PieChartOutlined />),
  getItem(<div className='item'>商品</div>, 'sub1', <MailOutlined />, [
    getItem(<Link to="category">品类管理</Link>, '/admin/category'),
    getItem(<Link to="product">商品管理</Link>, '/admin/product'),
  ]),
  getItem(<Link to="user">用户管理</Link>, '/admin/user', <PieChartOutlined />),
  getItem(<Link to="role">角色管理</Link>, '/admin/role', <PieChartOutlined />),
  getItem(<div className='item'>图形图表</div>, 'sub2', <AppstoreOutlined />, [
    getItem(<Link to="bar">柱状图</Link>, '/admin/bar'),
    getItem(<Link to="line">折线图</Link>, '/admin/line'),
    getItem(<Link to="pie">饼图</Link>,'/admin/pie' )
  ]),
];

export default function Sider() {
  var {pathname} = useLocation()
  var minPathname=pathname.slice(7)
  if(minPathname=='category' || minPathname=='product') minPathname='sub1'
  if(minPathname=='bar' || minPathname=='line' || minPathname=='pie') minPathname='sub2'
  useEffect(()=>{
  },[pathname])
  return (
    <div className='nav-sider'>
      {/* 头部 */}
      <div className="sider-header">
        <img src={logo} alt="" />
        <h1>后台管理系统</h1>
      </div>
      {/* menu */}
      <div
        style={{
          width: 300,
        }}
      >
        <Menu
          defaultSelectedKeys={[pathname] || ['/admin/home']}
          defaultOpenKeys={[minPathname]}
          mode="inline"
          theme="dark"
          items={items}
        />
      </div>
    </div>
  )
}
