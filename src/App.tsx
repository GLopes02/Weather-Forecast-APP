import React, { useState } from "react";
import { WeatherApiResponse } from "./components/WeatherInfo";
import ToggleSwitch from "./components/ToggleSwitch";
import "./App.css";
import WeatherImageMapper from "./components/WeatherImageMapper";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const [city, setCity] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<WeatherApiResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const fetchWeather = (): void => {
    if (!city) {
      setError("Please enter a city name.");
      setWeatherInfo(null);
      return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c0b83900827b3bbbe1f0bff07f9fa878`;

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found or other error");
        }
        return response.json();
      })
      .then((data: WeatherApiResponse) => {
        setWeatherInfo(data);
        setError(null);
        setCity("");
      })
      .catch((err: Error) => {
        console.log(err.message);
        setError("City not found. Please enter a valid city.");
        setCity("");
        setWeatherInfo(null);
      });
  };

  // Function to calculate daily averages from 3-hourly forecast data
  const calculateDailyForecast = (list: WeatherApiResponse["list"]) => {
    const dailyForecasts: { [key: string]: any } = {};

    list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString(); // Get the date in 'MM/DD/YYYY' format

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          tempSum: 0,
          feelsLikeSum: 0,
          humiditySum: 0,
          count: 0,
          weather: forecast.weather[0],
        };
      }

      dailyForecasts[date].tempSum += forecast.main.temp;
      dailyForecasts[date].feelsLikeSum += forecast.main.feels_like;
      dailyForecasts[date].humiditySum += forecast.main.humidity;
      dailyForecasts[date].count += 1;
    });

    // Calculate averages
    Object.keys(dailyForecasts).forEach((date) => {
      dailyForecasts[date].avgTemp =
        dailyForecasts[date].tempSum / dailyForecasts[date].count;
      dailyForecasts[date].avgFeelsLike =
        dailyForecasts[date].feelsLikeSum / dailyForecasts[date].count;
      dailyForecasts[date].avgHumidity =
        dailyForecasts[date].humiditySum / dailyForecasts[date].count;
    });

    return dailyForecasts;
  };

  const dailyForecasts = weatherInfo
    ? calculateDailyForecast(weatherInfo.list)
    : {};

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const celsiusToFahrenheit = (celsius: number): number => {
    return celsius * (9 / 5) + 32;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">World City Forecast</h1>

      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      <ErrorMessage error={error} />

      {weatherInfo && (
        <WeatherForecast
          weatherInfo={weatherInfo}
          dailyForecasts={dailyForecasts}
          isCelsius={isCelsius}
          toggleTemperatureUnit={toggleTemperatureUnit}
          celsiusToFahrenheit={celsiusToFahrenheit}
        />
      )}
    </div>
  );
}

export default App;
