import React from 'react';

interface TemperatureDisplayProps {
  temp: number;
  isCelsius: boolean;
  celsiusToFahrenheit: (celsius: number) => number;
  className?: string; // Optional className for styling
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
  temp,
  isCelsius,
  celsiusToFahrenheit,
  className,
}) => {
  const convertedTemp = isCelsius
    ? (temp - 273.15).toFixed(0)
    : celsiusToFahrenheit(temp - 273.15).toFixed(0);
  return (
    <span className={className}>
      {convertedTemp}°{isCelsius ? 'C' : 'F'}
    </span>
  );
};

export default TemperatureDisplay;
