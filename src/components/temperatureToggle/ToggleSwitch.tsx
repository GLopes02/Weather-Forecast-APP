import React from "react";
import "./ToggleSwitch.css"; // Import your CSS for styling

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <button className="temperature-unit-button" onClick={handleToggle}>
      <span className={isOn ? "active" : ""}>°C</span> | 
      <span className={!isOn ? "active" : ""}>°F</span>
    </button>
  );
};

export default ToggleSwitch;
