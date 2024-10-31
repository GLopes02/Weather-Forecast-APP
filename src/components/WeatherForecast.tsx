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
  const date = new Date(year, month - 1, day); // JavaScript months are zero-indexed (0 = January)
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
      <div className="city-name-and-toggle">
        <h2>
          Today's weather in {weatherInfo.city.name}, {weatherInfo.city.country}
        </h2>
        <ToggleSwitch isOn={isCelsius} handleToggle={toggleTemperatureUnit} />
      </div>
      <div className="main-forecast-container">
        <p>
          Average Temperature:{" "}
          {isCelsius
            ? (dailyForecasts[firstDay].avgTemp - 273.15).toFixed(2) + "°C"
            : celsiusToFahrenheit(
                dailyForecasts[firstDay].avgTemp - 273.15
              ).toFixed(2) + "°F"}
        </p>
        <p>
          Average Feels Like:{" "}
          {isCelsius
            ? (dailyForecasts[firstDay].avgFeelsLike - 273.15).toFixed(2) + "°C"
            : celsiusToFahrenheit(
                dailyForecasts[firstDay].avgFeelsLike - 273.15
              ).toFixed(2) + "°F"}
        </p>

        <p>Weather: {dailyForecasts[firstDay].weather.description}</p>
        <WeatherImageMapper
          description={dailyForecasts[firstDay].weather.icon}
        />
      </div>

      <div className="forecast-container">
        {remainingDays.map((date) => (
          <div className="forecast-card" key={date}>
            <h3 className="forecast-card-title">{getDayOfWeek(date)}</h3>
            <WeatherImageMapper
              description={dailyForecasts[date].weather.icon}
            />

            <div className="forecast-card-temp-range">
              <span className="forecast-card-temp-min">
                {isCelsius
                  ? (dailyForecasts[date].avgMinTemp - 273.15).toFixed(0) + "°C"
                  : celsiusToFahrenheit(
                      dailyForecasts[date].avgMinTemp - 273.15
                    ).toFixed(0) + "°F"}
              </span>

              <span className="forecast-card-temp-max">
                {isCelsius
                  ? (dailyForecasts[date].avgMaxTemp - 273.15).toFixed(0) + "°C"
                  : celsiusToFahrenheit(
                      dailyForecasts[date].avgMaxTemp - 273.15
                    ).toFixed(0) + "°F"}
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
