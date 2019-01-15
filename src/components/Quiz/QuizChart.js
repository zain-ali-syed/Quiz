import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [{name: 'Correct', value: 900}, {name: 'Incorrect', value: 450}];
const COLORS = ['#00ff00', '#ff0000'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const QuizChart = ({data}) => {
    return (
        <PieChart width={800} height={400} >
        <Pie
          data={data} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
};

export default QuizChart;