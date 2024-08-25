// src/InputSwitch.js
import React, { useState, useEffect } from "react";

const InputSwitch = ({ initialState = false, onChange }) => {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isOn);
  }, [isOn]);

  const handleToggle = () => {
    setIsOn((prevState) => {
      const newState = !prevState;
      if (onChange) {
        onChange(newState);
      }
      return newState;
    });
  };

  return (
    <div
      className={`relative flex items-center cursor-pointer rounded-full border border-white transition-colors duration-300 ease-in-out ${
        isOn ? "bg-transparent" : "bg-transparent"
      }`}
      onClick={handleToggle}
      role="switch"
      aria-checked={isOn}
      tabIndex="0"
      style={{
        width: "3.1rem",
        height: "1.4rem",
      }}
    >
      <div
        className={`absolute top-[0.49px] transition-transform duration-500  ease-in-out rounded-full border-2 border-white ${
          isOn ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          width: "1.2rem",
          height: "1.2rem",
          backgroundColor: "white",
          transform: `translateX(${isOn ? "1.7rem" : "0.1rem"})`,
        }}
      />
    </div>
  );
};

export default InputSwitch;
