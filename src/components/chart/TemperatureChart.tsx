import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

// Mock data
const mockData = [
  { time: '00:00', temperature: 285.15 },
  { time: '03:00', temperature: 287.15 },
  { time: '06:00', temperature: 290.15 },
  { time: '09:00', temperature: 292.15 },
  { time: '12:00', temperature: 295.15 },
  { time: '15:00', temperature: 293.15 },
  { time: '18:00', temperature: 290.15 },
  { time: '21:00', temperature: 288.15 },
];

// Function to convert Kelvin to Celsius
const convertToCelsius = (kelvin: number): number => parseFloat((kelvin - 273.15).toFixed(2));

const TemperatureChart: React.FC = () => {
  const chartData = mockData.map((entry) => ({
    time: entry.time,
    temperature: convertToCelsius(entry.temperature),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          tick={{ dy: 10 }} 
        />
        <YAxis 
          domain={['auto', 'auto']} 
          tick={{ dx: -10 }} 
        />
        <Tooltip formatter={(value: number) => [`${value} °C`, 'Temperature']} />
        <Line type="monotone" dataKey="temperature" stroke="#381515" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
