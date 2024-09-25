import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import CityBtn from "./Nav_Cities-btn";
import { SubmitBtn } from "./SubmitBtn";
import Resources from "./Resources";
import NavVenues from "./Nav-Venues";
import InputSwitch from "./InputSwitch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSwitchChange = (newState) => {
    console.log("Switch state:", newState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // const handleScroll = () => {
  //   if (isOpen) {
  //     setIsOpen(false);
  //   }
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <nav className="bg-[#408DBC] shadow-sm h-20 md:h-28 w-full relative header_font">
      <div className="max-w-7xl mx-auto h-[3.8rem] md:h-[4.7rem] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  justify-between">
          <div className="flex items-center  my-[0.35rem] md:my-3">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-12 w-12 md:h-20 md:w-20"
                  src="https://cdn.prod.website-files.com/6292201af07b5e3eec285411/6669c6db844716a4ad598c0f_Untitled%20design(2).webp"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
          <div className="mr-1 md:mr-9 flex items-center gap-2 md:gap-3 justify-between">
            <div>
              <InputSwitch initialState={false} onChange={handleSwitchChange} />
            </div>
            <div>
              <button
                onClick={toggleMenu}
                className="text-[32px] md:text-4xl hover:text-gray-200 text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                {isOpen ? <RxCross1 className=" " /> : <IoMenu className=" " />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="bg-[#000000] w-full h-[80vh] mx-auto z-50 sticky top-[4rem] md:top-[5rem] left-0 header_font"
          ref={menuRef}
        >
          <div className="py-4 md:pt-20 mt-3 md:mt-5 delay-300   duration-300 flex text-white flex-col justify-start  items-start ml-9 md:ml-28  ">
            <span className="my-1">
              <CityBtn />
            </span>
            <Link to="https://www.wildandfree.us/submit-an-event" className="">
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
