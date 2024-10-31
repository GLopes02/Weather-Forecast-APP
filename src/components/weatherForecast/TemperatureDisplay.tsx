import React from "react";

interface TemperatureDisplayProps {
  temp: number;
  isCelsius: boolean;
  celsiusToFahrenheit: (celsius: number) => number;
  className?: string; // Optional className for styling
  returnValueOnly?: boolean;
}
// Necessary since the temperature comes in kelvin
const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
  temp,
  isCelsius,
  celsiusToFahrenheit,
  className,
  returnValueOnly = false,
}) => {
  const convertedTemp = isCelsius
    ? (temp - 273.15).toFixed(0)
    : celsiusToFahrenheit(temp - 273.15).toFixed(0);
  if (returnValueOnly) {
    return <span className={className}>{convertedTemp}</span>;
  }
  return (
    <span className={className}>
      {convertedTemp}°{isCelsius ? "C" : "F"}
    </span>
  );
};

export default TemperatureDisplay;
