import React from "react";
import ToggleSwitch from "../temperatureToggle/ToggleSwitch";
import WeatherImageMapper from "../mappers/WeatherImageMapper";
import { WeatherApiResponse } from "../../models/WeatherInfo";
import "./WeatherForecast.css";
import { getDayOfWeek, upperCaseInitials } from "./Utils";
import TemperatureDisplay from "./TemperatureDisplay";
import TemperatureChart from '../chart/TemperatureChart';
import '../chart/TemperatureChart.css';

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
  const firstDay = dates[0];
  const remainingDays = dates.slice(1);
  const currentTemperature = weatherInfo.list[0].main.temp;

  return (
    <div>
      <div className="daily-weather-header-city-details">
        <div className="daily-weather-info-row">
          <div className="daily-weather-left">
            <WeatherImageMapper
              description={dailyForecasts[firstDay].weather.icon}
            />
            <h2 className="current-temperature">
              <TemperatureDisplay
                temp={currentTemperature}
                isCelsius={isCelsius}
                celsiusToFahrenheit={celsiusToFahrenheit}
                className="" // Here the class is empty because i dont want the style
                returnValueOnly={true}
              />
            </h2>
            <ToggleSwitch
              isOn={isCelsius}
              handleToggle={toggleTemperatureUnit}
            />
          </div>

          <div className="daily-weather-header">
            <p className="city-name-label">
              {weatherInfo.city.name}, {weatherInfo.city.country}
            </p>
            <p className="week-day-label">{getDayOfWeek(firstDay)}</p>
            <p className="description-label">
              {upperCaseInitials(dailyForecasts[firstDay].weather.description)}
            </p>
          </div>
        </div>
      </div>

      <div className="temperature-evolution-graphic">
        
        <TemperatureChart />
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
