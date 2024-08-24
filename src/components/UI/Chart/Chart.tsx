import formatNumber from '@/utils/convertors/toIrString'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
type ChartType ={
    mainData:any,
    YDomain:[0,number]
}
function Chart({mainData,YDomain}:ChartType) {
  return (
    <ResponsiveContainer className="!h-[400px] sm:!w-[85%]   px-4 !flex !justify-start">
    <BarChart width={850} height={40} data={mainData}>
      <CartesianGrid strokeDasharray=".1 .1" />
      <XAxis
        dataKey="تاریخ"
        tickFormatter={formatNumber}
        style={{ marginRight: "auto" }}
      />
      <YAxis
        dx={-45}
        domain={YDomain}
        fontSize={"13px"}
        tickFormatter={formatNumber}
      />
      <Tooltip formatter={(value: any) => formatNumber(value)} />
      <Legend formatter={(value) => formatNumber(value)} />
      <Bar
        dataKey={"مجموع_درآمد_کاربر"}
        stroke="#711D1C"
        fill="#711D1C"
        width={100}
        height={40}
      />
      <Bar
        dataKey={"تعداد_کاربران_جدید"}
        stroke="#82ca9d"
        fill="#8884d8"
        width={100}
        height={40}
      />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default Chart