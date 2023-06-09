import React, { useEffect, useState } from 'react'
import { Card, Select, Input, Button, Table, Tag,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getPaginationList, getSeacch, modifyStatus,deleteProduct } from '../../api'
import { useNavigate } from 'react-router-dom';
import { func } from 'prop-types';
export default function Home() {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [pNum, setPageNum] = useState(1)
  const [params, setParams] = useState({
    pageNum: pNum,
    pageSize: 5,
    searchName: '',
    searchType: 'productName'
  })
  var navigate = useNavigate()
  useEffect(() => {
    getPagination(1, 5)
  }, [])
  //去detail
  var goDetail = (record) => {
    navigate('detail', {
      state: {
        record
      }
    })
  }
  var goUpdate = (record) => {
    navigate('add-updateProduct',{
        state:{
          record
        }
      })
  }
  //Table
  const columns = [
    {
      width: '200px',
      title: '商家名称',
      dataIndex: 'name',
    },
    {
      width: '500px',
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'address',
      render: (a, b) => {
        return (
          <div>
            <div style={{ textAlign: 'center',marginBottom:10,fontSize:17 }}>{b.status == 1 ? '在售' : '已下架'}</div>
            <Button size='small' onClick={() => { modify(b) }} style={{ display: 'block', margin: '0 auto' }} type='primary'>{b.status == 1 ? '下架' : '上架'}</Button>
          </div>
        )
      }
    },

    {
      title: '操作',
      render: (_, record) => (

        <div>
          <a onClick={() => { goDetail(record) }}>详情</a>
          <br />
          <a onClick={() => { goUpdate(record) }}>修改</a>
          <br />
          <a onClick={() => { deletePro(record) }}>删除</a>
        </div>
      ),
    },
  ];
  //获取分页数据
  var getPagination = (pageNum, pageSize) => {
    setPageNum(pageNum)
    getPaginationList({ pageNum, pageSize }).then(res => {
      setData(res.data.data.list)
      setTotal(res.data.data.total)
    })
  }
  //获取搜索数据
  var getSearchList = () => {
    if (params.searchName) {
      getSeacch(params).then(res => {
        setData(res.data.data.list)
      })
    } else {
      getPagination(1, 5)
    }
  }
  //修改状态
  function modify(b) {
    if (b.status == 1) {
      var status = 2
    }
    else {
      var status = 1
    }
    var productId = b._id
    modifyStatus({ productId, status }).then(res => {
    })
    getPagination(pNum, 5)
  }
//删除商品
var deletePro=(record)=>{
  deleteProduct({_id:record._id}).then(
    res=>{
      message.success('删除成功')
      getPagination(pNum,5)
    }
  )
  console.log(record);
}
  return (
    <Card
      style={{ width: '100%' }}
      title={
        <>
          <Select
            onChange={(value) => { setParams({ ...params, searchType: value }) }}
            value={params.searchType}
            style={{
              width: 120,
            }}
            options={[
              {
                value: 'productName',
                label: '按名称搜索',
              },
              {
                value: 'productDesc',
                label: '按描述搜索',
              },
            ]}
          />
          <Input style={{ width: 200, margin: '0 20px' }} placeholder='关键字' value={params.searchName} onChange={(e) => {
            setParams({ ...params, 'searchName': e.target.value })
          }} />
          <Button type='primary' onClick={getSearchList}>搜索</Button>
        </>
      }

      extra={<><Button type='primary' onClick={() => { navigate('add-updateProduct') }}><><PlusOutlined style={{ margin: '0 10px' }} />添加商品</></Button></>}>
      <Table
        pagination={{
          current:pNum,
          defaultPageSize: 5,
          total: total,
          onChange: (pageNum, pageSize) => { getPagination(pageNum, pageSize) }
        }}
        bordered
        rowKey={'_id'}
        columns={columns} dataSource={data} />
    </Card>
  )
}
