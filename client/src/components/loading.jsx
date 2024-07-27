import React from "react";
// Import the custom animations here

const Loader = () => {
  return (
    <div className="loader absolute inset-0  flex items-center justify-center  ">
      <div className="jimu-primary-loading relative bg-blue-600 text-transparent w-[13.6px] h-[32px] mx-auto"></div>
    </div>
  );
};

export default Loader;
