import React from "react";

// Define the props type
interface WeatherImageMapperProps {
  description: string;
}

// Map descriptions to image file names
const descriptionToImage: { [key: string]: string } = {
  "clear sky": "clear_sky.png",
  "few clouds": "cloud.png",
  "scattered clouds": "mist_cloud.png",
  "overcast clouds": "overcast_clouds.png",
  "broken clouds": "broken_clouds.png",
  "shower rain": "heavy_rain.png",
  "light rain": "light_rain.png",
  "moderate rain": "rain.png",
  "heavy rain": "heavy_rain.png",
  "thunderstorm": "stormy.png",
  "snow": "snowing.png",
  "mist": "mist_sun.png",
};

const WeatherImageMapper: React.FC<WeatherImageMapperProps> = ({
  description,
}) => {
  // Get the image name based on the description
  const imageName =
    descriptionToImage[description.toLowerCase()] || "default.png";

  return (
    <div>
      <img
        src={`/images/${imageName}`}
        alt={description}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default WeatherImageMapper;
