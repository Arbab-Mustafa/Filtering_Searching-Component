/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const CityBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [city, setCity] = useState("");

  const toggleCity = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Define the async function
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/getAllEvents`
        );
        const fetchedCities = response.data
          .flatMap((event) => event.fieldData.cities) // Flatten the array if needed
          .filter((city, index, self) => self.indexOf(city) === index); // Remove duplicates

        setCity(fetchedCities);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    // Call the async function
    fetchEvents();
  }, []);
  const sortedCities = Array.from(new Set(city)).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div>
      <div
        className="flex justify-between  my-2 text-[1.3rem] items-center gap-2 md:gap-4 text-[#408DBC] px-4 md:px-10 bg-white  hover:bg-transparent hover:border-2 border-white  cursor-pointer rounded-full py-3 delay-150"
        onClick={toggleCity}
      >
        <span>
          <FaLocationDot />
        </span>
        <span className="text-xl md:text-[1.2rem] font-semibold    ">City</span>
        <span className="">
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </div>
      {/*  */}

      {isOpen && (
        <div>
          <ul className="flex flex-col gap-3 bg-transparent text-center h-64 overflow-scroll items-center md:items-start font-[Inter] scrollbar-hide">
            {sortedCities.map((ci, index) => (
              <Link to={`/cities/${ci}`} key={index}>
                <li className="text-base font-medium">{ci}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityBtn;
