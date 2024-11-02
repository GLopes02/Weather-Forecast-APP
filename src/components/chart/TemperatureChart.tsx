import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./TemperatureChart.css";

interface HourlyData {
  time: string; // Format: 'HH:mm'
  temp: number; // Temperature in Kelvin
}

interface TemperatureChartProps {
  hourlyData: HourlyData[]; // Array of hourly data
  isCelsius: boolean;
  celsiusToFahrenheit: (celsius: number) => number;
}

const kelvinToCelsius = (kelvin: number): number =>
  parseFloat((kelvin - 273.15).toFixed(0));

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  hourlyData,
  isCelsius,
  celsiusToFahrenheit,
}) => {
  // Prepare chart data
  const chartData = hourlyData.map((entry) => ({
    time: entry.time,
    temperature: isCelsius
      ? kelvinToCelsius(entry.temp)
      : celsiusToFahrenheit(kelvinToCelsius(entry.temp)),
  }));
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ dy: 10 }}
          tickFormatter={(time: string) => time.substring(0, 5)}
        />
        <YAxis domain={["auto", "auto"]} tick={{ dx: -10 }} />
        <Tooltip
          formatter={(value: number) => [
            `${value.toFixed(0)} °${isCelsius ? "C" : "F"}`,
            "Temperature",
          ]}
        />
        <Line
          type="natural"
          dataKey="temperature"
          stroke="#000000"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
