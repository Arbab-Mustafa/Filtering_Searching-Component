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
      className={`relative   flex justify-center items-center   md:w-14 md:h-8  w-[2.8rem] h-5 rounded-full cursor-pointer border border-white transition-colors duration-300`}
      onClick={handleToggle}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={`absolute top-[0.120rem] left-0.5 w-4 h-4 md:w-7 md:h-7 rounded-full bg-white border border-white transition-transform duration-300 ${
          isOn ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
};

export default InputSwitch;
