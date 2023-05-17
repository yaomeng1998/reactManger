import React from 'react'
import { Card, Space, Divider, List, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './product.less'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {getCategoryById} from '../../api'
import { useEffect ,useState} from 'react';
export default function Detail() {
  const navigate =useNavigate()
  const location =useLocation()
  const record=location.state.record
  const {categoryId,pCategoryId}=location.state.record
  const [pname,setPname]=useState('')
  const [cname,setCname]=useState('')
  console.log(record);
  useEffect(() => {
    async function fetchData() {
      const results=await Promise.all([getCategoryById({categoryId}),getCategoryById({pCategoryId})])
      setPname(results[0].data.data.name)
      setCname(results[0].data.data.name)
      }
    fetchData();
  }, []);
  
  return (
    <Card
      style={{ width: '100%' }}
      title={
        <div style={{cursor:'pointer',fontSize:20}} onClick={()=>{navigate(-1)}}><ArrowLeftOutlined style={{ marginRight: 15 }} />商品详情</div>
      } extra={<a href="#"></a>}>
      <>
        <List bordered>
        <List.Item>
          <span className='ItemName'>商品名称：<span className='item'>{record.name}</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品描述：<span className='item'>{record.desc}</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品价格：<span className='item'>{record.price}</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>所属分类：<span className='item'>{
            <>{pname}{cname?<span> --> {cname}</span>:''}</>
          }</span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品图片：<span className='item'>
            <img src="https://th.bing.com/th/id/R.91b4dcc3e03d2e3ad84513bc4c03e05f?rik=XGKwZjybdfFjfA&riu=http%3a%2f%2fcdn.sdk.caohua.com%2fwww%2fzhuanqu%2f15260284934608.jpg&ehk=gEyd1oNUAo4uF1gTDvDtD%2fO8%2f8LFxbtsLCNtvdCMFkw%3d&risl=&pid=ImgRaw&r=0" alt="" />
            {record.imgs.map(res=>{
                return <img key={res} src={'http://localhost:5000/upload/'+res} alt="" />
            })}
            </span></span>
        </List.Item>
        <List.Item>
          <span className='ItemName'>商品详情：<span className='item' dangerouslySetInnerHTML = {{ __html: record.detail}}></span></span>
        </List.Item>
        </List>
      </>
    </Card>
  )
}
