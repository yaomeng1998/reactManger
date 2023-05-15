import React from 'react'
import { DatePicker, Space, Layout } from 'antd';
import userMemory from '../../utils/userMemory'
import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
import LeftNav from '../../componet/nav-sider'
import Header from '../../componet/nav-header'
import './admin.less'
const dataChange = (date, dateString) => {
  console.log(date, dateString);
};
const { Footer, Sider, Content } = Layout;

export default function Admin() {
  var user = userMemory.user
  if (!user || !user._id) {
    return <Navigate to='/login' />
  }
  return (
    <>
      <Layout >
        <Sider width='300px'>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>          </Header>
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>

            <Outlet />
          </Content>
          <Footer style={{marginTop:5,backgroundColor:'red'}} >Footer</Footer>
        </Layout>
      </Layout>
    </>
  )
}

