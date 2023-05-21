import React from 'react'
import { Card, Button, Col, Row, Statistic, DatePicker, Space, Timeline, } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SmileOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react'
function getOption() {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [10, 100, 100, 60, 180, 90, 20],
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [60, 180, 70, 160, 80, 190, 120],
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ]
  }
}
function getOption2() {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [10, 100, 100, 60, 180, 90, 20],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ]
  }
}
function getOption3() {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [100, 150, 50, 180, 70, 130, 100],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [70, 90, 180, 160, 100, 60, 120],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ]
  }
}
const tabList = [
  {
    key: 'tab1',
    tab: '访问量',
  },
  {
    key: 'tab2',
    tab: '销售量',
  },
];
const contentList = {
  tab1: <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Card
      title='访问趋势'
      style={{ width: '60%' }}>
      <div style={{ width: 714 }}>
        <ReactECharts option={getOption2()} />
      </div>
    </Card>
    <Card
      style={{ marginRight: 140 }}
      title='任务'>
      <Timeline >
        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
        <Timeline.Item color="green">完成网站设计出版</Timeline.Item>
        <Timeline.Item color="red">
          <p>连接接口</p>
          <p>功能验收</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>登录功能设计</p>
          <p>权限验证</p>
          <p>页面排版</p>
        </Timeline.Item>
      </Timeline>
    </Card>
  </div>,
  tab2:
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Card
        title='销售量'
        style={{ width: '60%' }}>
        <ReactECharts option={getOption3()} />
      </Card>
      <Card
        style={{ marginRight: 140 }}
        title='任务'>
        <Timeline >
          <Timeline.Item color="green">新版本迭代会</Timeline.Item>
          <Timeline.Item color="green">完成网站设计出版</Timeline.Item>
          <Timeline.Item color="red">
            <p>连接接口</p>
            <p>功能验收</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>登录功能设计</p>
            <p>权限验证</p>
            <p>页面排版</p>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  ,
};
const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};
const onOk = (value) => {
  console.log('onOk: ', value);
};
export default function Home() {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <div>
      <div className='homeTop' style={{ display: 'flex' }}>
        <Card
          title={<span style={{ color: 'gray' }}>商品总量</span>}
          style={{ width: 300, margin: 50 }}
        >
          <Row gutter={16}>
            <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
              <Statistic value={112893} /><span style={{ marginLeft: 7, fontSize: 17 }}>个</span>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ marginRight: 10, color: 'gray' }}>周同比</span>
              <Statistic
                value={11.28}
                precision={2}
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={16} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ marginRight: 10, color: 'gray', marginLeft: '-13px' }}>日同比</span>
              <Statistic
                value={9.3}
                precision={2}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Col>
          </Row>
        </Card>
        <div
          style={{ width: '60%' }}>
          <ReactECharts option={getOption()} />
        </div>
      </div>
      <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '95%',
          }}
          extra={<Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Space>}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={(key) => {
            onTab1Change(key);
          }}
        >
          {contentList[activeTabKey1]}
        </Card>
      </div>
    </div>
  )
}
