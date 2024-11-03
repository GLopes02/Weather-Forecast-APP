import React, { useState } from "react";
import ToggleSwitch from "../temperatureToggle/ToggleSwitch";
import WeatherImageMapper from "../mappers/WeatherImageMapper";
import { WeatherApiResponse } from "../../models/WeatherInfo";
import "./WeatherDetails.css";
import "./ForecastCard.css";
import { getDayOfWeek, upperCaseInitials } from "./Utils";
import TemperatureDisplay from "./TemperatureDisplay";
import TemperatureChart from "../chart/TemperatureChart";
import "../chart/TemperatureChart.css";

interface HourlyData {
  time: string;
  temp: number;
}

interface DailyForecast {
  avgMinTemp: number;
  avgMaxTemp: number;
  hourlyData: HourlyData[];
  weather: {
    icon: string;
    description: string;
  };
}

interface WeatherForecastProps {
  weatherInfo: WeatherApiResponse;
  dailyForecasts: { [key: string]: DailyForecast };
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
  const remainingDays = dates.slice(0, 6);
  const currentTemperature = weatherInfo.list[0].main.temp;
  const [selectedDay, setSelectedDay] = useState<string>(firstDay);
  const handleDayClick = (date: string) => {
    setSelectedDay(date);
  };

  return (
    <div>
      <div className="daily-weather-info-row">
        <div className="daily-weather-left">
          <WeatherImageMapper
            description={dailyForecasts[firstDay].weather.icon}
            className="main-weather-image"
          />
          <h2 className="current-temperature">
            <TemperatureDisplay
              temp={currentTemperature}
              isCelsius={isCelsius}
              celsiusToFahrenheit={celsiusToFahrenheit}
              className="" // Here the class is empty because I don't want the style
              returnValueOnly={true}
            />
          </h2>
          <div className="daily-weather-header-toggle">
            <ToggleSwitch
              isOn={isCelsius}
              handleToggle={toggleTemperatureUnit}
            />
          </div>
        </div>
        <div className="daily-weather-right">
          <p className="city-name-label">
            {weatherInfo.city.name}, {weatherInfo.city.country}
          </p>
          <p className="week-day-label">{getDayOfWeek(firstDay)}</p>
          <p className="description-label">
            {upperCaseInitials(dailyForecasts[firstDay].weather.description)}
          </p>
        </div>
      </div>

      <div className="temperature-evolution-graphic">
        <TemperatureChart
          hourlyData={dailyForecasts[selectedDay].hourlyData}
          isCelsius={isCelsius}
          celsiusToFahrenheit={celsiusToFahrenheit}
        />
      </div>

      <div className="forecast-container">
        {remainingDays.map((date) => (
          <div
            className="forecast-card"
            key={date}
            onClick={() => handleDayClick(date)}
          >
            <h3 className="forecast-card-title">{getDayOfWeek(date)}</h3>
            <WeatherImageMapper
              description={dailyForecasts[date].weather.icon}
            />
            <div className="forecast-card-temp-range">
              <TemperatureDisplay
                temp={dailyForecasts[date].avgMaxTemp}
                isCelsius={isCelsius}
                celsiusToFahrenheit={celsiusToFahrenheit}
                className="forecast-card-temp-max"
              />
              <TemperatureDisplay
                temp={dailyForecasts[date].avgMinTemp}
                isCelsius={isCelsius}
                celsiusToFahrenheit={celsiusToFahrenheit}
                className="forecast-card-temp-min"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
