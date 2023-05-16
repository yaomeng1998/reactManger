import React from 'react'
import { Card, Space, Divider, List, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './product.less'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Detail() {
  const navigate =useNavigate()
  const location =useLocation()
  console.log(location);
  return (
    <Card
      style={{ width: '100%' }}
      title={
        <div style={{cursor:'pointer'}} onClick={()=>{navigate(-1)}}><ArrowLeftOutlined style={{ marginRight: 15 }} />商品详情</div>
      } extra={<a href="#"></a>}>
      <>
        <List bordered>
        <List.Item>
          <span className='ItemName'>商品名称：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品描述：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品价格：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>所属分类：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品图片：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品详情：<span className='item'>xxxxxxx</span></span>
        </List.Item>
        </List>
      </>
    </Card>
  )
}
