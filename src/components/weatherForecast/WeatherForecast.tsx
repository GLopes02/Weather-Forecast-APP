import React from "react";
import ToggleSwitch from "../temperatureToggle/ToggleSwitch";
import WeatherImageMapper from "../mappers/WeatherImageMapper";
import { WeatherApiResponse } from "../../models/WeatherInfo";
import './WeatherForecast.css';
import { getDayOfWeek } from './DateUtils';
import TemperatureDisplay from './TemperatureDisplay'; // Import the new TemperatureDisplay

interface WeatherForecastProps {
  weatherInfo: WeatherApiResponse;
  dailyForecasts: { [key: string]: any };
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
  celsiusToFahrenheit: (celsius: number) => number;
}

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
