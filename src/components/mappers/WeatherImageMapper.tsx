import React from "react";

// Define the props type
interface WeatherImageMapperProps {
  description: string;
}
const WeatherImageMapper: React.FC<WeatherImageMapperProps> = ({
  description,
}) => {
  return (
    <div>
      <img
        src={`/images/${description+ ".png"}`}
        alt={description}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default WeatherImageMapper;
