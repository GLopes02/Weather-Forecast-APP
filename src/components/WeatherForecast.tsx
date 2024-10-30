import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import WeatherImageMapper from "./WeatherImageMapper";

interface WeatherForecastProps {
  weatherInfo: any; 
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
  const remainingDays = dates.slice(1); // Separate the first day from the rest

  return (
    <div style={{ display: "flex" }}>
      {/* Main forecast display for the first day */}
      <div>
        <h2>
          {weatherInfo.city.name}, {weatherInfo.city.country}
        </h2>
        <ToggleSwitch isOn={isCelsius} handleToggle={toggleTemperatureUnit} />
        <div>
          <h3>{firstDay}</h3>
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
              ? (dailyForecasts[firstDay].avgFeelsLike - 273.15).toFixed(2) +
                "°C"
              : celsiusToFahrenheit(
                  dailyForecasts[firstDay].avgFeelsLike - 273.15
                ).toFixed(2) + "°F"}
          </p>
          <p>Weather: {dailyForecasts[firstDay].weather.description}</p>
          <WeatherImageMapper
            description={dailyForecasts[firstDay].weather.description}
          />
        </div>
      </div>

      {/* Next 5  days */}
      <div>
        <h3>Upcoming Days</h3>
        {remainingDays.map((date) => (
          <div key={date}>
            <h4>{date}</h4>
            <p>
              {isCelsius
                ? (dailyForecasts[date].avgTemp - 273.15).toFixed(2) + "°C"
                : celsiusToFahrenheit(
                    dailyForecasts[date].avgTemp - 273.15
                  ).toFixed(2) + "°F"}
            </p>
            <WeatherImageMapper
              description={dailyForecasts[date].weather.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
