import React, { useState } from "react";
import { WeatherApiResponse } from "./models/WeatherInfo";
import ToggleSwitch from "./components/temperatureToggle/ToggleSwitch";
import "./App.css";
import WeatherImageMapper from "./components/mappers/WeatherImageMapper";
import SearchBar from "./components/searchBar/SearchBar";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import WeatherForecast from "./components/weatherForecast/WeatherForecast";

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
        console.log(data);
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
          minTemp: forecast.main.temp_min,
          maxTemp: forecast.main.temp_max,
          weather: forecast.weather[0],
          hourlyData: []
        };
      }

      dailyForecasts[date].tempSum += forecast.main.temp;
      dailyForecasts[date].feelsLikeSum += forecast.main.feels_like;
      dailyForecasts[date].humiditySum += forecast.main.humidity;
      dailyForecasts[date].count += 1;
      // Update min and max temps
      if (forecast.main.temp_min < dailyForecasts[date].minTemp) {
        dailyForecasts[date].minTemp = forecast.main.temp_min;
      }
      if (forecast.main.temp_max > dailyForecasts[date].maxTemp) {
        dailyForecasts[date].maxTemp = forecast.main.temp_max;
      }
      dailyForecasts[date].hourlyData.push({
        time: forecast.dt_txt.split(' ')[1],      // e.g., "2024-11-01 03:00:00"
        temp: forecast.main.temp,    // temperature value in Kelvin
      });
    });

    // Calculate averages
    Object.keys(dailyForecasts).forEach((date) => {
      dailyForecasts[date].avgTemp =
        dailyForecasts[date].tempSum / dailyForecasts[date].count;
      dailyForecasts[date].avgFeelsLike =
        dailyForecasts[date].feelsLikeSum / dailyForecasts[date].count;
      dailyForecasts[date].avgHumidity =
        dailyForecasts[date].humiditySum / dailyForecasts[date].count;

      dailyForecasts[date].avgMinTemp = dailyForecasts[date].minTemp;
      dailyForecasts[date].avgMaxTemp = dailyForecasts[date].maxTemp;
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
