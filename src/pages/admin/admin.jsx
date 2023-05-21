import React from 'react'
import { DatePicker, Space, Layout } from 'antd';
import userMemory from '../../utils/userMemory'
import { Navigate, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import LeftNav from '../../componet/nav-sider'
import Header from '../../componet/nav-header'
import './admin.less'
const dataChange = (date, dateString) => {
  console.log(date, dateString);
};
const { Footer, Sider, Content } = Layout;
export default function Admin() {
  const navivate = useNavigate()
  const user = !!userMemory.user._id
  return (
    <>
        {
          user?  < Layout >
          <Sider width='300px'>
            <LeftNav />
          </Sider>
          <Layout>
            <Header></Header>
            <Content style={{ margin: 20, backgroundColor: '#fff' }}>
              <Outlet />
            </Content>
            <Footer style={{ marginTop: 5, backgroundColor: (240, 242, 245), color: 'gray', textAlign: 'center' }} >欢迎使用姚猛后台管理系统，使用谷歌浏览器访问更佳！</Footer>
          </Layout>
        </Layout >:<Navigate  to='/login'/>

        }
    </>

  )






}

