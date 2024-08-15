import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

const Resources = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    VenuesData();
  }, []);

  const toggleCity = () => {
    setIsOpen(!isOpen);
  };

  const VenuesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/venues/getAllVenues`
      );
      // Get unique venue names using a Set
      const uniqueVenues = [
        ...new Set(response.data.map((event) => event.name)),
      ];
      setVenue(uniqueVenues);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedVenue = [...venue].sort((a, b) => a.localeCompare(b));

  return (
    <div>
      <div
        className="flex justify-between my-2 md:text-2xl items-center gap-2 px-4 md:px-10 cursor-pointer rounded-full py-3 delay-150"
        onClick={toggleCity}
      >
        <span className="text-xl md:text-[1.2rem] my-3 md:my-6 font-semibold hover:text-gray-400 delay-200">
          Venues
        </span>
        <span className="">
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </div>

      {isOpen && (
        <div className="w-[15rem] md:w-[60rem] h-[10rem] md:h-[20rem] scrollbar-hidden text-white overflow-y-scroll">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 font-[Inter]">
            {sortedVenue.map((city, index) => (
              <Link to={`/venu/${city}`} key={index}>
                <li className="text-xs md:textxl">{city}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Resources;
