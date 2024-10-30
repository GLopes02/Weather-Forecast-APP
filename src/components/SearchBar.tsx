import React from "react";


interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: () => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, fetchWeather }) => {
  return (
    <div className="search-bar-container ">
      <input
        className="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
      />
      <button className="search-button" onClick={fetchWeather}>Search</button>
    </div>
  );
};

export default SearchBar;
