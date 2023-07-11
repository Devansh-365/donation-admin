"use client";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";

interface PieChartProps {
  data: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PieSection: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
