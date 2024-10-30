import React from "react";
import "./ToggleSwitch.css"; // Import your CSS for styling

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <button className="temperature-unit-button" onClick={handleToggle}>
      {isOn ? "°C" : "°F"}
    </button>
  );
};

export default ToggleSwitch;
