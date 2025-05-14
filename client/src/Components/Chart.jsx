// import React from 'react'
import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart , Pie} from 'recharts';


                            

const Chart = ({data, dataKey, grid}) => {
  return (
  <>
   {/* <ResponsiveContainer width='100%' aspect={3}>
      <LineChart width={500} height={400} data={data}>
        {console.log(data)}
        <XAxis dataKey="name" stroke="#5550bd" />
        <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        <Tooltip />
        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
    <ResponsiveContainer aspect={3} width="90%" >
      <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="Active User" />
            <Tooltip />
            <Area type="monotone" dataKey="Active User" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}

  </>
    );
}

export default Chart