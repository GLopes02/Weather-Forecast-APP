import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

// Define the type for hourly data
interface HourlyData {
  time: string; // Format: 'HH:mm'
  temp: number; // Temperature in Kelvin
}

interface TemperatureChartProps {
  hourlyData: HourlyData[]; // Array of hourly data
  isCelsius: boolean; // Flag to indicate if temperature should be in Celsius
  celsiusToFahrenheit: (celsius: number) => number; // Function to convert Celsius to Fahrenheit
}

// Function to convert Kelvin to Celsius
const convertToCelsius = (kelvin: number): number => parseFloat((kelvin - 273.15).toFixed(0));

const TemperatureChart: React.FC<TemperatureChartProps> = ({ hourlyData, isCelsius, celsiusToFahrenheit }) => {
  // Prepare chart data
  const chartData = hourlyData.map((entry) => ({
    time: entry.time,
    temperature: isCelsius
      ? convertToCelsius(entry.temp) // Convert to Celsius if needed
      : celsiusToFahrenheit(convertToCelsius(entry.temp)), // Convert to Fahrenheit if not Celsius
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          tick={{ dy: 10 }} 
          tickFormatter={(time: string) => time.substring(0, 5)} 
        />
        <YAxis domain={['auto', 'auto']} tick={{ dx: -10 }} />
        <Tooltip formatter={(value: number) => [`${value.toFixed(0)} °${isCelsius ? 'C' : 'F'}`, 'Temperature']} />
        <Line type="monotone" dataKey="temperature" stroke="#381515" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
