import React, { useState } from "react";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Resources = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCity = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex justify-between  my-2   items-center gap-2   px-4 md:px-10   cursor-pointer      rounded-full py-3 delay-150"
        onClick={toggleCity}
      >
        <span className="text-xl md:text-[1.3rem]   font-normal  hover:text-gray-400 delay-200">
          Resources
        </span>
        <span className="text-2xl">
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </div>

      {isOpen && (
        <div>
          <ul className="flex flex-col gap-4 items-end   font-[Inter]">
            <Link to="https://www.wildandfree.us/contact-us">
              <li className=" text-base   font-medium font-sans ">
                Contact Page
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Resources;
