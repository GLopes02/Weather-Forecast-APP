import React from "react";

interface WeatherImageMapperProps {
  description: string;
  className?: string; 
}

const WeatherImageMapper: React.FC<WeatherImageMapperProps> = ({
  description,
  className = "card-weather-image", 
}) => {
  return (
    <div>
      <img
        className={className}
        src={`/images/${description + ".png"}`}
        alt={description}
      />
    </div>
  );
};

export default WeatherImageMapper;