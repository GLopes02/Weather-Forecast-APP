import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import WeatherImageMapper from "./WeatherImageMapper";
import { WeatherApiResponse } from "./WeatherInfo";

interface WeatherForecastProps {
  weatherInfo: WeatherApiResponse;
  dailyForecasts: { [key: string]: any };
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
  celsiusToFahrenheit: (celsius: number) => number;
}

function getDayOfWeek(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

const TemperatureDisplay: React.FC<{
  temp: number;
  isCelsius: boolean;
  celsiusToFahrenheit: (celsius: number) => number;
  className?: string; // Optional className for styling
}> = ({ temp, isCelsius, celsiusToFahrenheit, className }) => {
  const convertedTemp = isCelsius
    ? (temp - 273.15).toFixed(0)
    : celsiusToFahrenheit(temp - 273.15).toFixed(0);
  return (
    <span className={className}>
      {convertedTemp}°{isCelsius ? "C" : "F"}
    </span>
  );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  weatherInfo,
  dailyForecasts,
  isCelsius,
  toggleTemperatureUnit,
  celsiusToFahrenheit,
}) => {
  const dates = Object.keys(dailyForecasts);
  const firstDay = dates[0]; // Get the first day
  const remainingDays = dates.slice(1); // Get the next five days

  return (
    <div>
      <div className="daily-weather-header-city-details">
        <h2>
          {weatherInfo.city.name}, {weatherInfo.city.country}
        </h2>
        <h3>{getDayOfWeek(firstDay)}</h3>

        <div className="daily-weather-info-row">
          <WeatherImageMapper
            description={dailyForecasts[firstDay].weather.icon}
          />
          <div className="daily-weather-current-temperature">
            <h2>30</h2>
            <ToggleSwitch
              isOn={isCelsius}
              handleToggle={toggleTemperatureUnit}
            />
          </div>
        </div>
      </div>

      <div className="forecast-container">
        {remainingDays.map((date) => (
          <div className="forecast-card" key={date}>
            <h3 className="forecast-card-title">{getDayOfWeek(date)}</h3>
            <WeatherImageMapper
              description={dailyForecasts[date].weather.icon}
            />

            <div className="forecast-card-temp-range">
              <TemperatureDisplay
                temp={dailyForecasts[date].avgMinTemp}
                isCelsius={isCelsius}
                celsiusToFahrenheit={celsiusToFahrenheit}
                className="forecast-card-temp-min"
              />

              <TemperatureDisplay
                temp={dailyForecasts[date].avgMaxTemp}
                isCelsius={isCelsius}
                celsiusToFahrenheit={celsiusToFahrenheit}
                className="forecast-card-temp-max"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
