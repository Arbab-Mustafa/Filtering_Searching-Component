import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import CityBtn from "./Nav_Cities-btn";
import { SubmitBtn } from "./SubmitBtn";
import Resources from "./Resources";
import NavVenues from "./Nav-Venues";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-color     shadow-sm  w-full z-[9999]">
      <div className="max-w-7xl mx-auto h-[3.8rem] md:h-[4.7rem]  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 md:h-16 md:w-16"
                src="https://cdn.prod.website-files.com/6292201af07b5e3eec285411/6669c6db844716a4ad598c0f_Untitled%20design(2).webp"
                alt="Logo"
              />
            </div>
            <div className="hidden md:block"></div>
          </div>
          <div className="-mr-2 flex ">
            <button
              onClick={toggleMenu}
              className="bg-gray-900 text-xl md:text-2xl text-gray-300 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <RxCross1 /> : <IoMenu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className=" bg-[#000000] w-full   h-[80vh]  mx-auto" ref={menuRef}>
          <div className="py-4 md:py-9 delay-300 duration-300 flex text-white  flex-col  justify-start   items-center   ">
            <span className=" my-1">
              <CityBtn />
            </span>
            <Link to="https://www.wildandfree.us/submit-an-event" className=" ">
              <SubmitBtn />
            </Link>
            <span className="">
              <Resources />
            </span>
            <span className="">
              <NavVenues />
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
