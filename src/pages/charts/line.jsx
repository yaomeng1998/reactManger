import React from 'react'
import { Card } from 'antd'
import ReactECharts from 'echarts-for-react';
export default function Line() {
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
      ]
    }
  }
  return (
    <Card title="折线图"
      extra={<a href="#"></a>} style={{ width: '100%' }}>
      <ReactECharts option={getOption()} />
    </Card>
  )
}