import formatNumber from '@/utils/convertors/toIrString'
import React from 'react'
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
type ChartType ={
    mainData:any,
    YDomain:[0,number]
    children:React.ReactNode
}
function Chart({mainData,YDomain,children}:ChartType) {
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
     {children}
    </BarChart>
  </ResponsiveContainer>
  )
}

export default Chart