// src/InputSwitch.js
import React, { useState, useEffect } from "react";

const InputSwitch = ({ initialState = false, onChange }) => {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    if (isOn) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <div
      className={`relative w-14 h-8 rounded-full cursor-pointer border border-white transition-colors duration-300`}
      onClick={handleToggle}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white border border-white transition-transform duration-300 ${
          isOn ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
};

export default InputSwitch;
